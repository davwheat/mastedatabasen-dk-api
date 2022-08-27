import { InferAttributes, InferCreationAttributes, Model, ModelStatic } from 'sequelize';
import { TransformerFunction } from '../transformer';
import { ModelPresenter } from '../presenters/ModelPresenter';

import type * as Express from 'express';
import type { JsonOptions } from 'yayson';

export interface IListModelControllerPagingParams {
  limit: number;
  offset: number;
}

export abstract class AbstractPresentController<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> {
  protected model: ModelStatic<M>;
  protected modelName: string;
  protected modelSerializer: typeof ModelPresenter;
  protected modelTransformer: TransformerFunction<M>;

  protected request!: Express.Request;
  protected response!: Express.Response;
  protected next!: Express.NextFunction;

  public constructor(
    model: ModelStatic<M>,
    modelName: string,
    modelSerializer: typeof ModelPresenter,
    modelTransformer: TransformerFunction<M> = async (m) => m
  ) {
    this.model = model;
    this.modelName = modelName;
    this.modelSerializer = modelSerializer;
    this.modelTransformer = modelTransformer;
  }

  public async onRequest(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
    this.request = req;
    this.response = res;
    this.next = next;

    const data = await this.data();

    if (data) {
      let response;

      try {
        response = await this.postSerializeTransform(await this.serialize(data), data);
      } catch (e) {
        return;
      }

      await this.sendResponse(response);
    } else {
      let response;

      try {
        response = await this.postSerializeTransform([], []);
      } catch (e) {
        return;
      }

      await this.sendResponse(response);
    }
  }

  protected abstract data(): Promise<M | M[] | void>;

  protected async getSerializerConfig(): Promise<JsonOptions> {
    return {};
  }

  protected async serialize(data: M | M[] | null | undefined): Promise<any> {
    const options = await this.getSerializerConfig();

    if (Array.isArray(data)) {
      return await this.modelSerializer.render(await this.modelTransformer(data), options);
    } else if (data) {
      return await this.modelSerializer.render(await this.modelTransformer(data), options);
    } else {
      return await this.modelSerializer.render([], options);
    }
  }

  protected async preSerializeTransform(rawData: M | M[]): Promise<M | M[]> {
    return rawData;
  }

  protected async postSerializeTransform(data: any, rawData: M | M[]): Promise<any> {
    return data;
  }

  protected async sendResponse(serializedData: Partial<any>): Promise<void> {
    this.response.send(serializedData);
  }
}
