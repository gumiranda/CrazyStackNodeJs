import { Kafka } from "kafkajs";
import { env } from "@/application/infra";

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
  async disconnectProducer() {
    await this.producer.disconnect();
  }
  async sendMessage(topic: string, message: string) {
    await this.producer.send({ topic, messages: [{ value: message }] });
  }
  async consumeMessages(consumers: ConsumerKafka[]) {
    const topics = consumers.map((consumer: ConsumerKafka) => consumer.topic);
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
  const kafkaAdapterInstance = makeKafkaAdapter();
  await kafkaAdapterInstance.connectProducer();
  await kafkaAdapterInstance.sendMessage(topic, message);
  await kafkaAdapterInstance.disconnectProducer();
}
export async function consumeMessageKafka({ consumers }: KafkaConsumerInput) {
  const kafkaAdapterInstance = makeKafkaAdapter();
  await kafkaAdapterInstance.connectConsumer();
  await kafkaAdapterInstance.consumeMessages(consumers);
  return kafkaAdapterInstance;
}
export type SendMessageInput = {
  topic: string;
  message: string;
};
type KafkaConsumerInput = {
  consumers: ConsumerKafka[];
};
export type ConsumerKafka = {
  topic: string;
  callback: (message: any) => Promise<void>;
};
