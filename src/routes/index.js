// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Dependencies
 */
import express from 'express';
/**
 * Custom
 */
import { testEnvironmentVariable } from '../settings';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({ message: `Welcome to EXPRESS API TEMPLATE! This is our env ${testEnvironmentVariable}` });
});

export default indexRouter;
