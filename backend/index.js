require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loan');
const officerRoutes = require('./routes/officer');
const customerRoutes = require('./routes/customer');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/loan', loanRoutes);
app.use('/officer', officerRoutes);
app.use('/customer', customerRoutes);

const PORT = 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongo connected');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch(err => console.error('Mongo connect error', err));

    