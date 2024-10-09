import { env } from "../../config";
import {
  consumeMessageKafka,
  makeKafkaAdapter,
  sendMessageKafka,
} from "../adapters/kafkaAdapter";
import {
  consumeMessageRabbitMQ,
  makeRabbitMQAdapter,
  sendMessageRabbitMQ,
} from "../adapters/rabbitMQAdapter";
import type { ConsumerInput, SendMessageInput } from "../protocols/message.types";

export const makeBrokerMessageFactory = () => {};

const brokers = {
  kafka: makeKafkaAdapter,
  rabbitmq: makeRabbitMQAdapter,
} as const;
export type BrokerMessaging = keyof typeof brokers;

export const makeBrokerMessagingProvider = (provider: BrokerMessaging) => {
  return brokers[provider]();
};

export async function sendMessage({ topic, message }: SendMessageInput) {
  await sendMessageTypes[env.messageBroker]({ topic, message });
}
export async function consumeMessage({ consumers }: ConsumerInput) {
  return consumeMessageTypes[env.messageBroker]({ consumers });
}

const sendMessageTypes = {
  kafka: sendMessageKafka,
  rabbitmq: sendMessageRabbitMQ,
} as const;
export type SendMessagingTypes = keyof typeof sendMessageTypes;
const consumeMessageTypes = {
  kafka: consumeMessageKafka,
  rabbitmq: consumeMessageRabbitMQ,
} as const;
export type ConsumeMessagingTypes = keyof typeof consumeMessageTypes;
