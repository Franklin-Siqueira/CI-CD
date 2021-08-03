// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
  {
    res.status(200).json({ message: 'Welcome to EXPRESS API TEMPLATE...' });
  }
);

export default indexRouter;
