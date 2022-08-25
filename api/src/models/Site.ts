import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  Association,
  NonAttribute,
  Sequelize,
} from 'sequelize';

import { getConnection } from '../database/connection';
import { FrequencyBand } from './FrequencyBand';
import { Operator } from './Operator';
import { ServiceType } from './ServiceType';
import { Technology } from './Technology';

export class Site extends Model<InferAttributes<Site>, InferCreationAttributes<Site>> {
  declare id: CreationOptional<number>;

  declare mastId: number;
  declare stationName: string;
  declare lat: number;
  declare lon: number;

  declare startDate: CreationOptional<Date | null>;

  declare houseNumber: CreationOptional<string | null>;
  declare streetName: CreationOptional<string | null>;
  declare town: CreationOptional<string | null>;
  declare streetCode: CreationOptional<string | null>;
  declare communeCode: CreationOptional<string | null>;
  declare postNumber: CreationOptional<string | null>;

  declare frequencyBandId: ForeignKey<FrequencyBand['id'] | null>;
  declare operatorId: ForeignKey<Operator['id'] | null>;
  declare serviceTypeId: ForeignKey<ServiceType['id'] | null>;
  declare technologyId: ForeignKey<Technology['id'] | null>;

  declare frequencyBand?: NonAttribute<FrequencyBand>;
  declare operator?: NonAttribute<Operator>;
  declare serviceType?: NonAttribute<ServiceType>;
  declare technology?: NonAttribute<Technology>;

  declare static associations: {
    frequencyBand: Association<FrequencyBand, Site>;
    operator: Association<Operator, Site>;
    serviceType: Association<ServiceType, Site>;
    technology: Association<Technology, Site>;
  };

  static initModel(sequelize: Sequelize) {
    Site.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        mastId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'mast_id',
        },
        stationName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'station_name',
        },
        lat: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          field: 'lat',
        },
        lon: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          field: 'lon',
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'start_date',
        },
        houseNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'house_number',
        },
        streetName: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'street_name',
        },
        town: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'town',
        },
        streetCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'street_code',
        },
        communeCode: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'commune_code',
        },
        postNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'post_number',
        },
      },
      {
        underscored: true,
        tableName: 'sites',
        sequelize,
        timestamps: false,
      }
    );
  }

  static initAssociations() {
    Site.belongsTo(FrequencyBand, {
      foreignKey: {
        field: 'frequency_band_id',
        name: 'frequencyBandId',
      },
    });

    Site.belongsTo(Operator, {
      foreignKey: {
        field: 'operator_id',
        name: 'operatorId',
      },
    });

    Site.belongsTo(ServiceType, {
      foreignKey: {
        field: 'service_type_id',
        name: 'serviceTypeId',
      },
    });

    Site.belongsTo(Technology, {
      foreignKey: {
        field: 'technology_id',
        name: 'technologyId',
      },
    });
  }
}
