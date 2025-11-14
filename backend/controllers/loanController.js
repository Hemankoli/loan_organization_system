const LoanApplication = require('../models/LoanApplication');
const Customer = require('../models/Customer');
const loanService = require('../services/loanService');

exports.applyLoan = async (req, res) => {
    try {
        const { customerId, amountRequested, tenureMonths } = req.body;
        if (!customerId || !amountRequested || !tenureMonths) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const app = await LoanApplication.create({ customerId, amountRequested, tenureMonths });
        await loanService.evaluateLoan(app._id);
        res.json({ loanId: app._id, message: 'Loan application submitted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStatus = async (req, res) => {
    try {
        const loanId = req.params.id;
        const app = await LoanApplication.findById(loanId).select('status eligibilityScore');
        if (!app) return res.status(404).json({ message: 'Loan not found' });
        res.json({ status: app.status, eligibilityScore: app.eligibilityScore });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
