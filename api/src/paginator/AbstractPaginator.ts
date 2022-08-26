import QueryString from 'qs';
import { InferAttributes, InferCreationAttributes, Model, ModelStatic } from 'sequelize';
import { generateUrl } from '../utils/generateUrl';

interface IDocumentLinks {
  first?: string;
  self: string;
  next?: string;
  prev?: string;
}

type NonConstructorKeys<T> = { [P in keyof T]: T[P] extends new () => any ? never : P }[keyof T];
type NonConstructor<T> = Pick<T, NonConstructorKeys<T>>;

export type ModelPaginator<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> = new (
  limit: number,
  offset: number,
  query: QueryString.ParsedQs
) => NonConstructor<AbstractPaginator<M>>;

export abstract class AbstractPaginator<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> {
  protected model: ModelStatic<M>;

  protected limit: number;
  protected offset: number;

  protected path: string;
  protected query: QueryString.ParsedQs;

  constructor(model: ModelStatic<M>, limit: number, offset: number, path: string, query: QueryString.ParsedQs) {
    this.model = model;

    this.limit = limit;
    this.offset = offset;

    this.path = path;
    this.query = query;
  }

  private areMoreResults(collection: M[]): boolean {
    return collection.length > this.limit;
  }

  public generateLinks(collection: M[]): IDocumentLinks {
    const firstParams = { ...this.query, page: undefined };
    const nextParams = {
      ...this.query,
      page: {
        offset: (this.offset + this.limit).toString(),
        limit: this.limit.toString(),
      },
    };
    const prevParams = {
      ...this.query,
      page: {
        offset: (this.offset - this.limit).toString(),
        limit: this.limit.toString(),
      },
    };

    const links: IDocumentLinks = {
      first: generateUrl(this.path, firstParams),
      self: generateUrl(this.path, this.query),
    };

    if (this.areMoreResults(collection)) {
      links.next = generateUrl(this.path, nextParams);
    }

    if (parseInt(prevParams.page.offset) >= 0) {
      links.prev = generateUrl(this.path, prevParams);
    }

    return links;
  }
}
