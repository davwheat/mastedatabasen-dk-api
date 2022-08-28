import { FrequencyBand, Operator, ServiceType, Site, Technology } from '../../models';
import { AbstractListModelController } from '../AbstractListModelController';

import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { Op } from 'sequelize';
import { SitePresenter } from '../../presenters';
import { SitePaginator } from '../../paginator/SitePaginator';

export class ListSiteController extends AbstractListModelController<Site> {
  protected readonly shouldPaginate: boolean = true;
  protected readonly maxLimit: number = 5000;
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

    const whereQuery: any[] = [];

    if (typeof filter !== 'object' || Array.isArray(filter)) {
      this.next(new InvalidParameterError("Query param 'filter' is invalid.", 'filter'));
      return;
    }

    const { bounding_box } = filter;

    if (bounding_box) {
      if (typeof bounding_box !== 'string') {
        this.next(new InvalidParameterError("Query param 'filter.bounding_box' is invalid.", 'filter.bounding_box'));
        return;
      }

      const [lat1, lon1, lat2, lon2] = bounding_box.split(',').map((s) => parseFloat(s));

      if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        this.next(new InvalidParameterError("Query param 'filter.bounding_box' is invalid.", 'filter.bounding_box'));
        return;
      }

      whereQuery.push({
        lat: {
          [Op.between]: [Math.min(lat1, lat2), Math.max(lat1, lat2)],
        },
      });

      whereQuery.push({
        lon: {
          [Op.between]: [Math.min(lon1, lon2), Math.max(lon1, lon2)],
        },
      });
    }

    ['frequency_band', 'operator', 'service_type', 'technology'].forEach((key) => {
      const val = filter[key];

      if (!val) return;

      if (typeof val !== 'string') {
        this.next(new InvalidParameterError(`Query param 'filter.${key}' is invalid.`, `filter.${key}`));
        return;
      }

      const valId = parseInt(val);

      if (isNaN(valId) || valId <= 0) {
        this.next(new InvalidParameterError(`Query param 'filter.${key}' must be a valid integer, greater than 0.`, `filter.${key}`));
        return;
      }

      const camelKey = key.replace(/(_[A-Z])/g, (match) => match[1].toUpperCase());

      whereQuery.push({ [`${camelKey}Id` as keyof typeof whereQuery]: valId });
    });

    const models = (await this.model.findAll({
      where: { [Op.and]: whereQuery },
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
