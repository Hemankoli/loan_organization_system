const Customer = require('../models/Customer');
const LoanApplication = require('../models/LoanApplication');
const User = require('../models/User');

exports.getCustomerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.findOne({ userId }).populate('userId', 'name email');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({
      _id: customer._id,
      name: customer.userId.name,
      email: customer.userId.email,
      income: customer.income,
      creditScore: customer.creditScore,
    });
  } catch (error) {
    console.error('Error fetching customer by userId:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCustomerApplications = async (req, res) => {
  try {
    const { customerId } = req.params;
    const applications = await LoanApplication.find({ customerId });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching customer applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
