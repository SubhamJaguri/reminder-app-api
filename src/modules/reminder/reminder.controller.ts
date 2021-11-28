import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  createReminder,
  getRemindersByUserId,
  getReminderById,
} from './reminder.repository';

const addReminder = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, date_time } = req.body;

  const reminder = await createReminder({
    title,
    description,
    userId: req.userId,
    date_time,
  });

  if (reminder) {
    res.status(201).json(reminder);
  } else {
    res.status(400);
    throw new Error('Invalid reminder data');
  }
});

const getAllRemindersForUser = asyncHandler(
  async (req: Request, res: Response) => {
    const reminders = await getRemindersByUserId(req.userId);
    res.status(201).json(reminders);
  }
);

const getReminder = asyncHandler(async (req: Request, res: Response) => {
  const reminder = await getReminderById(req.userId);
  res.status(201).json(reminder);
});
export { addReminder, getAllRemindersForUser, getReminder };
