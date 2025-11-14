const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../middlewares/authMiddleware');

router.post('/apply', auth, loanController.applyLoan);
router.get('/:id/status', auth, loanController.getStatus);

module.exports = router;