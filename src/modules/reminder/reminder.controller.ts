import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  createReminder,
  getRemindersByUserId,
  getReminderById,
  updateReminder,
  deleteReminder,
} from './reminder.repository';

const addReminder = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, date_time } = req.body;

  let reminder = await createReminder({
    title,
    description,
    userId: req.userId,
    date_time,
  });

  reminder.status = 'success';

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

const updateReminderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const reminder_id = req.params.id;

    let reminder: any = await updateReminder(reminder_id, req.body);

    reminder.status = 'success';

    if (reminder) {
      res.status(201).json(reminder);
    } else {
      res.status(400);
      throw new Error('Invalid reminder data');
    }
  }
);

const deleteReminderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const reminder_id = req.params.id;

    let reminder: any = await deleteReminder(reminder_id);

    reminder.status = 'success';

    if (reminder) {
      res.status(201).json(reminder);
    } else {
      res.status(400);
      throw new Error('error');
    }
  }
);

export {
  addReminder,
  getAllRemindersForUser,
  getReminder,
  updateReminderHandler,
  deleteReminderHandler,
};
