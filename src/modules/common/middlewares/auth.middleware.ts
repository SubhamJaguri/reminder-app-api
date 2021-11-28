import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token =
          req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!
        );

        req.userId = decoded.userId as string;
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export { isAuth };
