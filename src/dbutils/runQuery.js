// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

import { createTables, insertIntoTables } from './queryFunctions';

(async () => {
  await createTables();
  await insertIntoTables();
})();
