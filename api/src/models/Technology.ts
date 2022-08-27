import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
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

export class Technology extends Model<InferAttributes<Technology>, InferCreationAttributes<Technology>> {
  declare id: CreationOptional<number>;

  declare technologyName: string;
  declare sitesCount?: number;

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
    sites: Association<Technology, Site>;
  };

  static async initModel(sequelize: Sequelize) {
    Technology.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        technologyName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sitesCount: {
          type: DataTypes.VIRTUAL,
        },
      },
      {
        underscored: true,
        tableName: 'technologies',
        sequelize,
        timestamps: false,
      }
    );
  }

  static initAssociations() {
    Technology.hasMany(Site, {
      foreignKey: {
        field: 'technology_id',
        name: 'technologyId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
}
