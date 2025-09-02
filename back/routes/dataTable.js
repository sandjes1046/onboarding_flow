const { Router } = require ('express');
const router = Router()
const { getData } = require('../helperFunctions/dataTable')

router.get('/get-data', getData)


module.exports = {
  path: '/data',
  router
};
