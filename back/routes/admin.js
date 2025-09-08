const { Router } = require ('express');
const router = Router()
const { getOnboarding,saveOnboarding } = require('../controllers/admin')

router.get('/get-onboarding', getOnboarding)

router.put('/save-onboarding', saveOnboarding)


module.exports = {
  path: '/admin',
  router
};
