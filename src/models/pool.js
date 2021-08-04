// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Dependencies
 */
import { Pool } from 'pg';
// import url from 'url';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

// const databaseConfig = { dbConnectionString: connectionString };

// const ELEPHANT_CONNECTION_KEY="41679e8a-a25a-4da3-a5c9-d3c33149ce90";
// const ELEPHANT_CONNECTION_PAS="sFHbU6upeYq3731Zhehid_D4DZxrE1nk";
// const CONNECTION_STRING="postgres://ccnenevv:sFHbU6upeYq3731Zhehid_D4DZxrE1nk@hattie.db.elephantsql.com/ccnenevv";

// // const params = url.parse(connectionString);
// const params = url.parse(CONNECTION_STRING);
// const auth = params.auth.split(':');

// const config = {
//   user: auth[0],
//   password: auth[1],
//   host: params.hostname,
//   port: params.port,
//   database: params.pathname.split('/')[1],
//   ssl: true
// };
// export const pool = new Pool(databaseConfig);

export const pool = new Pool({ connectionString });
// export const pool = new Pool(config);

export default pool;
