import express from 'express';
import { isAuth } from '../common/middlewares/auth.middleware';
import {
  addReminder,
  deleteReminderHandler,
  getAllRemindersForUser,
  getReminder,
  updateReminderHandler,
} from './reminder.controller';

const router = express.Router();

router.get('/my-reminders', isAuth, getAllRemindersForUser);
router.post('/', isAuth, addReminder);
router.get('/:id', getReminder);
router.put('/:id', updateReminderHandler);
router.delete('/:id', deleteReminderHandler);

export default router;
