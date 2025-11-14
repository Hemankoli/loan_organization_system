const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Customer = require('../models/Customer');
const LoanOfficer = require('../models/LoanOfficer');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, income, creditScore, branch } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash, role });

        if (role === 'CUSTOMER') {
            const customer = await Customer.create({ userId: user._id, income: income || 0, creditScore: creditScore || 300 });
            return res.json({ message: 'User registered successfully', userId: user._id, role: user.role, customerId: customer._id });
        } else {
            const officer = await LoanOfficer.create({ userId: user._id, branch: branch || '' });
            return res.json({ message: 'User registered successfully', user: {userId: user._id, name: user.name, email: user.email}, role: user.role, officerId: officer._id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "mysecretkey", { expiresIn: '8h' });
        res.json({ token, user: {userId: user._id, email: user.email}, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
