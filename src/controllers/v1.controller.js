import { Router } from 'express';
import logger from '../logger/winston.js';
import User from '../models/user.model.js';

const router = Router();

// Sign in route
router.post('/signin', async (req, res) => {
    logger.info('Sign in route called');
    const dummyUser = new User({
        username: 'dummyUser',
        email: 'dummy@example.com',
        password: 'dummyPassword',
        phoneNumber: '1234567890',
        citizenIdNumber: '123456789',
    });

    const queryUser = await User.findOne({ where: { username: dummyUser.username } })
    console.log(queryUser);
    res.json({ queryUser });
});

// Register route
router.post('/register', (req, res) => {
    // Handle register logic here
});

export default router;