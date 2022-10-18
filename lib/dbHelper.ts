import {Pool} from 'pg';

export const pool = new Pool ({

    'user': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'port': process.env.DB_PORT,
    'host': process.env.DB_HOST

})