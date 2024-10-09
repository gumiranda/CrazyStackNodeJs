import amqp, { Connection, Channel } from "amqplib";
import { env } from "@/application/infra";
import type { ConsumerInput, SendMessageInput } from "../protocols/message.types";
export class RabbitMQAdapter {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private brokerUrl: string) {}

  async connect() {
    this.connection = await amqp.connect(this.brokerUrl);
    this.channel = await this.connection.createChannel();
  }

  async disconnect() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async sendMessage(topic: string, message: string) {
    if (!this.channel) throw new Error("Channel is not initialized");
    await this.channel.assertQueue(topic, { durable: true });
    this.channel.sendToQueue(topic, Buffer.from(message), { persistent: true });
  }

  async consumeMessages(topic: string, callback: (message: string) => Promise<void>) {
    if (!this.channel) throw new Error("Channel is not initialized");
    await this.channel.assertQueue(topic, { durable: true });
    this.channel.consume(topic, async (msg) => {
      if (msg !== null) {
        await callback(msg.content.toString());
        this.channel!.ack(msg);
      }
    });
  }
}

export const makeRabbitMQAdapter = () => {
  return new RabbitMQAdapter(env.rabbitMqUrl ?? "");
};

export async function sendMessageRabbitMQ({ topic, message }: SendMessageInput) {
  const rabbitMqAdapter = makeRabbitMQAdapter();
  await rabbitMqAdapter.connect();
  await rabbitMqAdapter.sendMessage(topic, message);
  await rabbitMqAdapter.disconnect();
}

export async function consumeMessageRabbitMQ({ consumers }: ConsumerInput) {
  const rabbitMqAdapter = makeRabbitMQAdapter();
  await rabbitMqAdapter.connect();
  for (const consumer of consumers) {
    await rabbitMqAdapter.consumeMessages(consumer.topic, consumer.callback);
  }
  return rabbitMqAdapter;
}
