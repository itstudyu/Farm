import { Router } from 'express';
import { signupUser, loginUser, logoutUser } from '../controllers/authController';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router; 