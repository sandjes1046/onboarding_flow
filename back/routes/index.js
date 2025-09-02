const express = require('express');
const { forOwn } = require('lodash');

const init = () => {
  const router = express.Router();

  forOwn(routers, (config) => {
    router.use(config.path, config.router);
  });

  return router;
};

const routers = {
user: require('./user'),
admin: require('./admin'),
data: require('./dataTable')
};

module.exports = {
  init,
  routers,
};
