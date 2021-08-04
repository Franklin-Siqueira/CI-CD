// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Import our custom model
 */
import Model from '../models/model';

const messagesModel = new Model('messages');
/**
 *
 * messagesPage
 *
 * @param {*} req
 * @param {*} res
 */
export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
/**
 *
 * addMessage
 *
 * @param {*} req
 * @param {*} res
 */
export const addMessage = async (req, res) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
