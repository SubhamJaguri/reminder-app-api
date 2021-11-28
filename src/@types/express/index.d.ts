import { User } from '../../modules/user/models/user.model';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
