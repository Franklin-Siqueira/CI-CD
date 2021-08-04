// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

import dotenv from 'dotenv';

dotenv.config();
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
