export type SendMessageInput = {
  topic: string;
  message: string;
};
export type ConsumerInput = {
  consumers: Consumer[];
};
export type Consumer = {
  topic: string;
  callback: (message: any) => Promise<void>;
};
