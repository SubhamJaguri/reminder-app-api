import { User } from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
export const createForgotPasswordToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.FORGOT_PASSWORD_SECRET!,
    {
      expiresIn: '15m',
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,

    // domain: "localhost",
    // since we are using next js we can not restrict the cookie to be only accessible to this particular route
    // path: '/api/users/refreshToken' ,
  });
};
