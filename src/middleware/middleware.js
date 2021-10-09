// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';

/**
 *
 * modifyMessage
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const modifyMessage = (req, res, next) => {
  req.body.message = `READS: ${req.body.message}`;
  next();
};
/**
 *
 * performAsyncAction
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const performAsyncAction = async (req, res, next) => {
  try {
    await axios.get('https://picsum.photos/id/0/info');
    next();
  } catch (err) {
    next(err);
  }
};
