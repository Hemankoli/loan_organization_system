const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoanApplicationSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    officerId: { type: Schema.Types.ObjectId, ref: 'LoanOfficer' },
    amountRequested: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },
    interestRate: { type: Number },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    eligibilityScore: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);