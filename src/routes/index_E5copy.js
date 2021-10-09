// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => res.status(200).json({ message: 'Welcome to Express API template' }));
//
module.exports = router;
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
