import { FrequencyBand, Operator, ServiceType, Site, Technology } from '../../models';
import { AbstractListModelController } from '../AbstractListModelController';

import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { FindOptions, InferAttributes, Op } from 'sequelize';
import { SitePresenter } from '../../presenters';
import { SitePaginator } from '../../paginator/SitePaginator';
import { JsonOptions } from 'yayson';

export class ListSiteController extends AbstractListModelController<Site> {
  protected readonly shouldPaginate: boolean = true;
  protected readonly maxLimit: number = 100;
  protected readonly paginator = SitePaginator;

  protected hasMoreResults: boolean = false;

  constructor() {
    super(Site, 'sites', SitePresenter);
  }

  protected async data(): Promise<void | Site[]> {
    const query = this.request.query;

    const filter = query?.filter ?? {};
    let page;

    try {
      page = this.extractPage();
    } catch (e) {
      return;
    }

    const findOptions: FindOptions<InferAttributes<Site>>['where'] = {};

    if (typeof filter !== 'object' || Array.isArray(filter)) {
      this.next(new InvalidParameterError("Query param 'filter' is invalid.", 'filter'));
      return;
    }

    const { boundingBox } = filter;

    if (boundingBox) {
      if (typeof boundingBox !== 'string') {
        this.next(new InvalidParameterError("Query param 'filter.boundingBox' is invalid.", 'filter.boundingBox'));
        return;
      }

      const [lat1, lon1, lat2, lon2] = boundingBox.split(',').map((s) => parseFloat(s));

      if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        this.next(new InvalidParameterError("Query param 'filter.boundingBox' is invalid.", 'filter.boundingBox'));
        return;
      }

      findOptions.lat = {
        [Op.between]: [Math.min(lat1, lat2), Math.max(lat1, lat2)],
      };

      findOptions.lon = {
        [Op.between]: [Math.min(lon1, lon2), Math.max(lon1, lon2)],
      };
    }

    const models = (await this.model.findAll({
      where: findOptions,
      limit: page.limit + 1,
      offset: page.offset,
      include: [FrequencyBand, Operator, ServiceType, Technology],
      attributes: {
        exclude: ['frequencyBandId', 'operatorId', 'serviceTypeId', 'technologyId'],
      },
    })) as Site[];

    return models;
  }
}
