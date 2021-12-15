import { User } from '../models/user.model';
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from '../utils/tokenUtils';
import asyncHandler from 'express-async-handler';
import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  let userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await hash(password, 12);

  const user = new User();
  user.email = email;
  user.name = name;
  user.password = hashedPassword;

  await user.save();

  user.status = 'success';

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const valid = await compare(password, user.password);

  // update  user device_token in table

  if (!valid) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // login successful

  sendRefreshToken(res, createRefreshToken(user));
  res.json({
    status: 'success',
    accessToken: createAccessToken(user),
    user: user,
  });
});

const me = asyncHandler(async (req: Request, res: Response) => {
  const user: User | undefined = await User.findOne(req.userId);
  res.status(201).json(user && user.exclude('password'));
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    res.status(401);
    throw new Error('Refresh token not valid');
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    throw new Error('Refresh token not valid');
  }

  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    res.status(401);
    throw new Error('Refresh token not valid');
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    res.status(401);
    throw new Error('Refresh token not valid');
  }

  sendRefreshToken(res, createRefreshToken(user));
  res.json({
    accessToken: createAccessToken(user),
    user: user,
  });
});

const logout = asyncHandler(async (_, res: Response) => {
  sendRefreshToken(res, '');
  res.json({ message: 'User successfully logged out!' });
});

const revokeRefreshTokensForUser = asyncHandler(
  async (req: any, res: Response) => {
    await getConnection()
      .getRepository(User)
      .increment({ id: req.user.id }, 'tokenVersion', 1);
    res.json({
      message: 'All refresh token for this user has been revoked!',
    });
  }
);

export {
  register,
  login,
  logout,
  me,
  revokeRefreshTokensForUser,
  refreshToken,
};
