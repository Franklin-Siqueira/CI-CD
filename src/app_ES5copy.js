// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);

module.exports = app;
