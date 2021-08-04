// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

/**
 *
 */
import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
} from './queries';

pool.on('connect', () => {
  console.log('Connected to remote PostGreSQL database...');
});

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) {
        console.log('Trying queries...');
        resolve();
      }
    });
  });

export const dropTables = () => executeQueryArray([dropMessagesTable]);
export const createTables = () => executeQueryArray([createMessageTable]);
export const insertIntoTables = () => executeQueryArray([insertMessages]);
