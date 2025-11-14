const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');
const auth = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.get('/loans/pending', auth, requireRole('OFFICER'), officerController.getPending);
router.post('/loans/:id/review', auth, requireRole('OFFICER'), officerController.reviewLoan);
router.get("/loans/all", officerController.getAllLoans);

module.exports = router;