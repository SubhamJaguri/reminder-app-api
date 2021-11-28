import express from 'express';
import { isAuth } from '../common/middlewares/auth.middleware';
import {
  addReminder,
  getAllRemindersForUser,
  getReminder,
} from './reminder.controller';

const router = express.Router();

router.get('/my-reminders', isAuth, getAllRemindersForUser);
router.post('/', isAuth, addReminder);
router.get('/:id', getReminder);

export default router;
