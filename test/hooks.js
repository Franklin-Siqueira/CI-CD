// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

import {
  dropTables,
  createTables,
  insertIntoTables,
} from '../src/dbutils/queryFunctions';

/**
 *
 * before: Mocha.HookFunction
 *
 */
before(async () => {
  await createTables();
  await insertIntoTables();
});
/**
 *
 * after: Mocha.HookFunction
 *
 */
after(async () => {
  await dropTables();
});
