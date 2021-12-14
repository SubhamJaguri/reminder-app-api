import { Reminder } from './reminder.model';

export const createReminder = async (reminder: any) => {
  const newReminder = new Reminder();
  newReminder.title = reminder.title;
  newReminder.userId = reminder.userId;
  newReminder.date_time = reminder.date_time;
  newReminder.description = reminder.description;
  await newReminder.save();
  return newReminder;
};

export const getReminderById = async (id: string) => {
  const reminder = await Reminder.findOne(id);
  return reminder;
};

// export const getAllreminders = () => {};
export const getRemindersByUserId = async (userId: string) => {
  const reminders = await Reminder.find({ where: { userId: userId } });
  return reminders;
};

export const updateReminder = async (id: string, newValues: any) => {
  const reminder = await Reminder.update(id, newValues);
  return reminder;
};

export const deleteReminder = async (id: string) => {
  const reminder = await Reminder.delete(id);
  return reminder;
};
