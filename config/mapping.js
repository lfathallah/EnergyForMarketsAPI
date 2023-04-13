import {Sequelize, DataTypes} from 'sequelize'

import EnergyPark from "../models/EnergyPark.js"
import EnergyType from "../models/EnergyType.js"
import TimeBlock from "../models/TimeBlock.js"
import MarketType from "../models/MarketType.js"
import EnergyMarket from "../models/EnergyMarket.js"
import Offer from "../models/Offer.js";

const initMappings = (sequelize) => {
    EnergyPark.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        type: DataTypes.INTEGER
    }, {
        sequelize,
        schema: 'public',
        modelName: 'energy-park',
        tableName: 'energy-park',
    });

    EnergyType.init({
        id: { type: DataTypes.INTEGER, primaryKey: true},
        type: DataTypes.STRING
    }, {
        sequelize,
        schema: 'person',
        tableName: 'energy-type',
        modelName: 'energy-type',
    })

    MarketType.init({
        id: { type: DataTypes.INTEGER, primaryKey: true},
        type: DataTypes.STRING
    }, {
        sequelize,
        schema: 'person',
        tableName: 'market-type',
        modelName: 'market-type',
    })

    EnergyMarket.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        type: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        energy_reserve_min: DataTypes.STRING,
        energy_reserve_max: DataTypes.STRING,
    }, {
        sequelize,
        schema: 'public',
        modelName: 'energy-market',
        tableName: 'energy-market',
    });

    TimeBlock.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        nb_hours: DataTypes.INTEGER,
        energy_quantity: DataTypes.INTEGER,
        min_price: DataTypes.FLOAT,
        energy_park_id: DataTypes.FLOAT,
        offer_id: DataTypes.BIGINT
    }, {
        sequelize,
        schema: 'public',
        modelName: 'time-block',
        tableName: 'time-block',
    });

    Offer.init({
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        market: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        energy_quantity: DataTypes.INTEGER
    }, {
        sequelize,
        schema: 'public',
        modelName: 'offer',
        tableName: 'offer',
    });

    //** Many-to-One association between energy-park and energy-type
    EnergyType.hasMany(EnergyPark,{
        sequelize,
        foreignKey: "type"
    })

    //** Many-to-One association between energy-market and market-type
    MarketType.hasMany(EnergyMarket,{
        sequelize,
        foreignKey: "type"
    })

    //** Many-to-One association between TimeBlock and EnergyPark
    EnergyPark.hasMany(TimeBlock,{
        sequelize,
        foreignKey: "energy_park_id"
    })

    //** Many-to-One association between energy-park and energy-type
    Offer.hasMany(TimeBlock,{
        sequelize,
        foreignKey: "offer_id"
    })

}

export default initMappings;