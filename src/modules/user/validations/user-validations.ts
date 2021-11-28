import * as yup from 'yup';
import { Request, Response } from 'express';
const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  name: yup.string().required(),
});

// type User = yup.InferType<typeof userSchema>;
type User = any;

const authValidation = async (req: Request, res: Response, next: any) => {
  const newUser: User = req.body;
  try {
    await userSchema.validate(newUser);
    next();
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export default authValidation;
