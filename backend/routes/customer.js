const express = require('express');
const router = express.Router();
const { getCustomerByUserId, getCustomerApplications } = require('../controllers/customerController');

router.get('/by-user/:userId', getCustomerByUserId);
router.get('/:customerId/applications', getCustomerApplications);

module.exports = router;