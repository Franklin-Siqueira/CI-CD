// Copyright 2021 Franklin Siqueira.
// SPDX-License-Identifier: Apache-2.0

var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  return res.status(200)
  .json({ message: "Welcome to Express API template" }
  );
});
//
module.exports = router;
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
