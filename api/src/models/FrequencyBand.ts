import {
  Model,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  Association,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  Sequelize,
} from 'sequelize';

import { Site } from './Site';

export class FrequencyBand extends Model<InferAttributes<FrequencyBand>, InferCreationAttributes<FrequencyBand>> {
  declare id: CreationOptional<number>;

  declare frequencyBand: number;

  declare sites?: NonAttribute<Site[]>;

  declare getSites: HasManyGetAssociationsMixin<Site>;
  // declare addSite: HasManyAddAssociationMixin<Site, number>;
  // declare addSites: HasManyAddAssociationsMixin<Site, number>;
  // declare setSites: HasManySetAssociationsMixin<Site, number>;
  // declare removeSite: HasManyRemoveAssociationMixin<Site, number>;
  // declare removeSites: HasManyRemoveAssociationsMixin<Site, number>;
  declare hasSite: HasManyHasAssociationMixin<Site, number>;
  declare hasSites: HasManyHasAssociationsMixin<Site, number>;
  declare countSites: HasManyCountAssociationsMixin;
  // declare createSite: HasManyCreateAssociationMixin<Site, 'frequencyBandId'>;

  declare static associations: {
    sites: Association<FrequencyBand, Site>;
  };

  static initModel(sequelize: Sequelize) {
    FrequencyBand.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        frequencyBand: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        underscored: true,
        tableName: 'frequency_bands',
        sequelize,
        timestamps: false,
        defaultScope: {
          attributes: { include: [[Sequelize.fn('COUNT', Sequelize.col('Sites.technology_id')), 'siteCount']] },
          include: [{ model: Site, attributes: [] }],
          group: ['Technology.id'],
        },
      }
    );
  }

  static initAssociations() {
    FrequencyBand.hasMany(Site, {
      foreignKey: {
        field: 'frequency_band_id',
        name: 'frequencyBandId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
}
