// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0
/**
 * Control main page access
 */
import { testEnvironmentVariable } from '../settings';

export const indexPage = (req, res) => res.status(200).json({ message: testEnvironmentVariable });
