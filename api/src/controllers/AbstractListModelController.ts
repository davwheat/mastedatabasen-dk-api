import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { InvalidParameterError } from '../errors/InvalidParameterError';
import { ModelPaginator } from '../paginator/AbstractPaginator';
import { AbstractPresentController } from './AbstractPresentController';

export interface IListModelControllerPagingParams {
  limit: number;
  offset: number;
}

export abstract class AbstractListModelController<
  M extends Model<InferAttributes<M>, InferCreationAttributes<M>>
> extends AbstractPresentController<M> {
  protected readonly shouldPaginate: boolean = false;
  protected readonly maxLimit: number = 20;
  protected readonly paginator!: ModelPaginator<M>;

  protected async data(): Promise<M[] | void> {
    const models = (await this.model.findAll()) as M[];

    return models;
  }

  protected async preSerializeTransform(rawData: M | M[]): Promise<M | M[]> {
    if (!Array.isArray(rawData)) return rawData;

    const { limit } = this.extractPage();

    return rawData.slice(0, limit);
  }

  protected async postSerializeTransform(data: any, rawData: M[]): Promise<any> {
    if (!this.shouldPaginate) return data;

    const pageParams = this.extractPage();

    const paginator = new this.paginator(pageParams.limit, pageParams.offset, this.request.query);

    const links = paginator.generateLinks(rawData);

    data = { links, ...data };

    return data;
  }

  protected extractPage(): IListModelControllerPagingParams {
    const query = this.request.query;

    if (query.page) {
      if (typeof query.page !== 'object' || Array.isArray(query.page)) {
        const e = new InvalidParameterError(`'page' parameter must be an object with 'limit' and 'offset' parameters.`, 'page');
        this.next(e);
        throw e;
      }

      const { limit = this.maxLimit.toString(), offset = '0' } = query.page;

      if (typeof limit !== 'string') {
        const e = new InvalidParameterError(`Paging param 'limit' must be a valid integer.`, 'page.limit');
        this.next(e);
        throw e;
      }

      if (typeof offset !== 'string') {
        const e = new InvalidParameterError(`Paging param 'offset' must be a valid integer.`, 'page.offset');
        this.next(e);
        throw e;
      }

      const parsedLimit = parseInt(limit);

      if (isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > this.maxLimit) {
        const e = new InvalidParameterError(
          `Paging param 'limit' must be a valid integer, greater than 0 and less than ${this.maxLimit}.`,
          'page.limit'
        );
        this.next(e);
        throw e;
      }

      const parsedOffset = parseInt(offset);

      if (isNaN(parsedOffset) || parsedOffset < 0) {
        const e = new InvalidParameterError(`Paging param 'offset' must be a valid integer and greater than or equal to 0.`, 'page.offset');
        this.next(e);
        throw e;
      }

      return {
        limit: parsedLimit,
        offset: parsedOffset,
      };
    }

    return {
      limit: this.maxLimit,
      offset: 0,
    };
  }
}
