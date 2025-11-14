const LoanApplication = require('../models/LoanApplication');
const LoanOfficer = require('../models/LoanOfficer');

exports.getPending = async (req, res) => {
    try {
        const pending = await LoanApplication.find({ status: 'PENDING' })
            .populate({ path: 'customerId', populate: { path: 'userId', model: 'User' } });
        res.json(pending);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.reviewLoan = async (req, res) => {
    try {
        const loanId = req.params.id;
        const { decision, officerUserId } = req.body;
        const officer = await LoanOfficer.findOne({ userId: officerUserId });
        if (!officer) return res.status(404).json({ message: 'Officer record not found' });

        const app = await LoanApplication.findById(loanId);
        if (!app) return res.status(404).json({ message: 'Loan not found' });
        app.status = decision === 'APPROVED' ? 'APPROVED' : 'REJECTED';
        app.officerId = officer._id;
        await app.save();

        res.json({ message: `Loan ${app.status.toLowerCase()}`, loanId: app._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllLoans = async (req, res) => {
    try {
        const loans = await LoanApplication.find().populate({
                path: "customerId",
                populate: { path: "userId", select: "name email" },
            }).populate({
                path: "officerId",
                populate: { path: "userId", select: "name email" },
            }).sort({ createdAt: -1 });

        res.status(200).json(loans);
    } catch (error) {
        console.error("Error fetching loans:", error);
        res.status(500).json({ message: "Server error while fetching loans" });
    }
}

exports.getOfficerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const officer = await LoanOfficer.findOne({ userId }).populate('userId', 'name email');
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json({
      _id: officer._id,
      name: officer.userId.name,
      email: officer.userId.email,
    });
  } catch (error) {
    console.error('Error fetching customer by userId:', error);
    res.status(500).json({ message: 'Server error' });
  }
};