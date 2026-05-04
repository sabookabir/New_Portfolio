const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminExists = await User.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const admin = new User({
            username: 'admin',
            password: 'password123' // User should change this immediately
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: password123');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
