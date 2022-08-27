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

export class Operator extends Model<InferAttributes<Operator>, InferCreationAttributes<Operator>> {
  declare id: CreationOptional<number>;

  declare operatorName: string;
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
    sites: Association<Operator, Site>;
  };

  static initModel(sequelize: Sequelize) {
    Operator.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        operatorName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sitesCount: {
          type: DataTypes.VIRTUAL,
        },
      },
      {
        underscored: true,
        tableName: 'operators',
        sequelize,
        timestamps: false,
      }
    );
  }

  static initAssociations() {
    Operator.hasMany(Site, {
      foreignKey: {
        field: 'operator_id',
        name: 'operatorId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
}
