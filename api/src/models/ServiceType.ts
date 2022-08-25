import {
  Model,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  Association,
  Sequelize,
} from 'sequelize';

import { Site } from './Site';

export class ServiceType extends Model<InferAttributes<ServiceType>, InferCreationAttributes<ServiceType>> {
  declare id: CreationOptional<number>;

  declare serviceName: string;

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
  // declare createSite: HasManyCreateAssociationMixin<Site, 'operatorId'>;

  declare static associations: {
    sites: Association<ServiceType, Site>;
  };

  static initModel(sequelize: Sequelize) {
    ServiceType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        serviceName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        underscored: true,
        tableName: 'service_types',
        sequelize,
        timestamps: false,
        defaultScope: {
          attributes: { include: [[Sequelize.fn('COUNT', Sequelize.col('Sites.technology_id')), 'siteCount']] },
          include: [{ model: Site, attributes: [] }],
          group: ['ServiceType.id'],
        },
      }
    );
  }

  static initAssociations() {
    ServiceType.hasMany(Site, {
      foreignKey: {
        field: 'service_type_id',
        name: 'serviceTypeId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
}
