const { Router } = require ('express');
const router = Router()
const { getUser, getStep, saveStep } = require('../controllers/user')

router.get('/get-user', getUser)

router.get('/get-step', getStep)

router.put('/save-step', saveStep)

module.exports = {
  path: '/user',
  router
};
