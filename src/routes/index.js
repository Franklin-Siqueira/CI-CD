// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Dependencies
 */
import express from 'express';
/**
 * Custom
 */
import { indexPage, messagesPage, addMessage } from '../controllers';
// import { testEnvironmentVariable } from '../settings';

const indexRouter = express.Router();

// BEFORE adding ../controllers
// indexRouter.get('/', (req, res) => {
//   res.status(200)
//    .json(
// {
//   message: `Welcome to EXPRESS API TEMPLATE! This is our env ${testEnvironmentVariable}` 
// }
// );
// });
// AFTER
indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);

export default indexRouter;
