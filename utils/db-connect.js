import * as dotenv from 'dotenv'
dotenv.config()
import retrieveSecret from "./secret-retriever.js";
import {Sequelize} from "sequelize";
import * as pg from 'pg';
import initMappings from "../config/mapping.js";

const secret_name = process.env.DB_INSTANCE_SECRET_NAME;
const databaseUri = process.env.DB_URI;

const secret = JSON.parse(await retrieveSecret(secret_name));

export async function connectAndInit() {
    console.log('Connecting to postgres with database uri: ', databaseUri)

    let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, secret.password, {
        host: databaseUri,
        dialect: 'postgres',
        define: {
            timestamps: false
        }
    });

    console.log('Initializing ORM mapping');
    initMappings(sequelize);

    return sequelize;
}