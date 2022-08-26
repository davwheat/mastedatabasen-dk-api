import { Site } from '../../models';
import { ListModelController } from '../ListModelController';

import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { FindOptions, InferAttributes, Op } from 'sequelize';
import { SitePresenter } from '../../presenters';

export class ListSiteController extends ListModelController<Site> {
  protected readonly maxLimit: number = 100;

  protected hasMoreResults: boolean = false;

  constructor() {
    super(Site, 'sites', SitePresenter);
  }

  protected async data(): Promise<void | Site | Site[]> {
    const query = this.request.query;

    const filter = query?.filter ?? {};
    const page = this.extractPage();

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
    })) as Site[];

    const modelsToReturn = models.slice(0, page.limit);
    this.hasMoreResults = models.length > page.limit;

    return modelsToReturn;
  }
}
