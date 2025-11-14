const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoanOfficerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    branch: { type: String }
});

module.exports = mongoose.model('LoanOfficer', LoanOfficerSchema);