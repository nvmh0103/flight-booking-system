import { Router } from 'express';
import logger from '../logger/winston.js';

const router = Router();

// Sign in route
router.post('/signin', (req, res) => {
    logger.info('Sign in route called');
    res.json({ message: 'Sign in route called' });
});

// Register route
router.post('/register', (req, res) => {
    // Handle register logic here
});

export default router;