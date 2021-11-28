import express from 'express';
import { isAuth } from '../common/middlewares/auth.middleware';
import {
  login,
  logout,
  me,
  refreshToken,
  register,
  revokeRefreshTokensForUser,
} from './controllers/user.controller';
import authValidation from './validations/user-validations';

const router = express.Router();

// Register
router.post('/register', authValidation, register);

// Login
router.post('/login', login);

// Me
router.get('/me', isAuth, me);

//Refresh token
router.post('/refreshToken', refreshToken);

// Logout
router.post('/logout', isAuth, logout);

// revoke all refresh token for this user | Log the user out from all devices
router.post('/revokeRefreshTokensForUser', isAuth, revokeRefreshTokensForUser);

export default router;
