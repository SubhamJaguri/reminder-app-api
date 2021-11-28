import amqp, { Connection } from 'amqplib';

let channel: any;
const retryInterval: number = 3000;
export const startRabbitMQ = async () => {
  let conn: Connection;

  try {
    conn = await amqp.connect(process.env.RABBITMQ_URL);
  } catch (err) {
    console.error('Unable to connect to RabbitMQ: ', err);
    setTimeout(async () => await startRabbitMQ(), retryInterval);
    return;
  }

  channel = await conn.createChannel();

  await Promise.all([
    channel.assertQueue('PRODUCT_QUEUE', { durable: false }),
    channel.assertQueue('USER_QUEUE', { durable: false }),
  ]);
};

export const getChannel = () => {
  if (!channel) {
    throw new Error('Socket.channel not initialized!');
  }
  return channel;
};
