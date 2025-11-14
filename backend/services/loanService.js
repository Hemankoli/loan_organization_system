const LoanApplication = require('../models/LoanApplication');
const Customer = require('../models/Customer');

function normalizeCreditScore(score) {
    const min = 300, max = 850;
    if (score <= min) return 0;
    if (score >= max) return 1;
    return (score - min) / (max - min);
}

async function evaluateLoan(applicationId) {
    const app = await LoanApplication.findById(applicationId);
    if (!app) throw new Error('Application not found');

    const customer = await Customer.findById(app.customerId);
    if (!customer) throw new Error('Customer not found');

    const incomeCap = 200000;
    const incomeNorm = Math.min(customer.income / incomeCap, 1);
    const creditScoreNorm = normalizeCreditScore(customer.creditScore);
    const score = (0.6 * creditScoreNorm) + (0.4 * incomeNorm);

    app.eligibilityScore = Math.round(score * 100) / 100;
    const threshold = parseFloat(process.env.ELIGIBILITY_THRESHOLD || '0.6');
    app.status = score >= threshold ? 'APPROVED' : 'REJECTED';

    if (app.tenureMonths <= 6) app.interestRate = 7.5;
    else if (app.tenureMonths <= 12) app.interestRate = 9.5;
    else if (app.tenureMonths <= 24) app.interestRate = 10.5;
    else app.interestRate = 11;

    await app.save();
    return app;
}

module.exports = { evaluateLoan };
