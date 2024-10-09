import { Kafka } from "kafkajs";
import { env } from "@/application/infra";
import type {
  ConsumerInput,
  Consumer,
  SendMessageInput,
} from "../protocols/message.types";

export class KafkaAdapter {
  private kafka: Kafka;
  private producer: any;
  private consumer: any;
  constructor(broker: string, clientId: string) {
    this.kafka = new Kafka({
      brokers: [broker],
      clientId,
      sasl: {
        mechanism: "scram-sha-256",
        username: env.kafkaUsername,
        password: env.kafkaPassword,
      },
      ssl: true,
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: clientId });
  }
  async connectConsumer() {
    await this.consumer.connect();
  }
  async connectProducer() {
    await this.producer.connect();
  }
  async disconnectConsumer() {
    await this.consumer.disconnect();
  }
  async disconnect() {
    await this.consumer.disconnect();
  }
  async disconnectProducer() {
    await this.producer.disconnect();
  }
  async sendMessage(topic: string, message: string) {
    await this.producer.send({ topic, messages: [{ value: message }] });
  }
  async consumeMessages(consumers: Consumer[]) {
    const topics = consumers.map((consumer: Consumer) => consumer.topic);
    await this.consumer.subscribe({ topics, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, message }: any) => {
        const callback = consumers.find((consumer) => consumer.topic === topic)?.callback;
        if (!callback) {
          return;
        }
        await callback(message.value.toString());
      },
    });
  }
}
export const makeKafkaAdapter = () => {
  return new KafkaAdapter(env.kafkaHost, env.kafkaClientId);
};
export async function sendMessageKafka({ topic, message }: SendMessageInput) {
  if (process.env.NODE_ENV !== "production") return;
  const kafkaAdapterInstance = makeKafkaAdapter();
  await kafkaAdapterInstance.connectProducer();
  await kafkaAdapterInstance.sendMessage(topic, message);
  await kafkaAdapterInstance.disconnectProducer();
}
export async function consumeMessageKafka({ consumers }: ConsumerInput) {
  const kafkaAdapterInstance = makeKafkaAdapter();
  await kafkaAdapterInstance.connectConsumer();
  await kafkaAdapterInstance.consumeMessages(consumers);
  return kafkaAdapterInstance;
}
