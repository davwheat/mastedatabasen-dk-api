import { InferAttributes, InferCreationAttributes, Model } from 'sequelize/types';
import yayson from 'yayson';

const y = yayson({ adapter: 'sequelize' });

export class ModelPresenter<M extends Model<InferAttributes<M>, InferCreationAttributes<M>>> extends y.Presenter {
  static getMeta(areMoreResults: boolean = false) {
    return {
      moreResults: areMoreResults,
    };
  }
}
