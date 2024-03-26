import { KafkaAdapter, SendMessageInput, ConsumerKafka } from "./kafkaAdapter";
import { Kafka, Producer, Consumer } from "kafkajs";
import { mock, MockProxy } from "jest-mock-extended";
describe("Kafka Adapter tests", () => {
  let kafkaAdapter: KafkaAdapter;
  let kafkaMock: MockProxy<Kafka> & Kafka;
  let producerMock: MockProxy<Producer> & Producer;
  let consumerMock: MockProxy<Consumer> & Consumer;

  beforeEach(() => {
    producerMock = mock<Producer>();
    consumerMock = mock<Consumer>();
    kafkaMock = mock<Kafka>();
    kafkaMock.producer.mockReturnValue(producerMock);
    kafkaMock.consumer.mockReturnValue(consumerMock);
    kafkaAdapter = new KafkaAdapter("broker", "clientId");
    (kafkaAdapter as any).kafka = kafkaMock;
    (kafkaAdapter as any).producer = producerMock;
    (kafkaAdapter as any).consumer = consumerMock;
  });

  test("connectConsumer calls consumer.connect", async () => {
    await kafkaAdapter.connectConsumer();
    expect(consumerMock.connect).toHaveBeenCalled();
  });

  test("connectProducer calls producer.connect", async () => {
    await kafkaAdapter.connectProducer();
    expect(producerMock.connect).toHaveBeenCalled();
  });

  test("disconnectConsumer calls consumer.disconnect", async () => {
    await kafkaAdapter.disconnectConsumer();
    expect(consumerMock.disconnect).toHaveBeenCalled();
  });

  test("disconnectProducer calls producer.disconnect", async () => {
    await kafkaAdapter.disconnectProducer();
    expect(producerMock.disconnect).toHaveBeenCalled();
  });

  test("sendMessage sends a message to the producer", async () => {
    const input: SendMessageInput = { topic: "topic", message: "message" };
    await kafkaAdapter.sendMessage(input.topic, input.message);
    expect(producerMock.send).toHaveBeenCalledWith({
      topic: input.topic,
      messages: [{ value: input.message }],
    });
  });

  test("consumeMessages subscribes and runs the consumer", async () => {
    const consumers: ConsumerKafka[] = [{ topic: "topic", callback: jest.fn() }];
    await kafkaAdapter.consumeMessages(consumers);
    expect(consumerMock.subscribe).toHaveBeenCalledWith({
      topics: ["topic"],
      fromBeginning: true,
    });
    expect(consumerMock.run).toHaveBeenCalled();
  });
});
