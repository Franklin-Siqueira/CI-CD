// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Dependencies
 */
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
/**
 * Routes
 */
import indexRouter from './routes/index';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

export default app;