import { User } from './user.model';

export const getUserById = async (id: string) => {
  const user = await User.findOne(id);
  return user;
};
