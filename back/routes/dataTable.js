const { Router } = require ('express');
const router = Router()
const { getData } = require('../controllers/dataTable')

router.get('/get-data', getData)


module.exports = {
  path: '/data',
  router
};
