import QueryString from 'qs';
import { Site } from '../models';
import { AbstractPaginator } from './AbstractPaginator';

export class SitePaginator extends AbstractPaginator<Site> {
  constructor(limit: number, offset: number, query: QueryString.ParsedQs) {
    super(Site, limit, offset, '/sites', query);
  }
}
