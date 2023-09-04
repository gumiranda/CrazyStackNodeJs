// Importar as dependências
// import { FastifyKafka } from "fastify-kafka";
import { Encrypter, HashComparer } from "@/application/infra/crypto/protocols";

// // Criar uma classe KafkaAdapter que implementa as interfaces Encrypter e HashComparer
// export class KafkaAdapter implements Encrypter, HashComparer {
//   // Definir os atributos da classe
//   private readonly fastifyKafka: FastifyKafka;
//   private readonly producerTopic: string;
//   private readonly consumerTopic: string;

//   // Construtor da classe
//   constructor(fastifyKafka: FastifyKafka, producerTopic: string, consumerTopic: string) {
//     // Inicializar os atributos com os parâmetros recebidos
//     this.fastifyKafka = fastifyKafka;
//     this.producerTopic = producerTopic;
//     this.consumerTopic = consumerTopic;

//     // Registrar um consumidor do Kafka para receber as mensagens do tópico especificado
//     this.fastifyKafka.consumer.on(this.consumerTopic, async (message) => {
//       // Fazer algo com a mensagem recebida, por exemplo, imprimir no console
//       console.log(message.value.toString());
//     });
//   }

//   // Método para encriptar um valor e enviar para o Kafka
//   async encrypt(value: string): Promise<string> {
//     // Gerar um hash aleatório para encriptar o valor
//     const hash = Math.random().toString(36).substring(2);

//     // Enviar o valor encriptado para o Kafka no tópico especificado
//     await this.fastifyKafka.producer.send({
//       topic: this.producerTopic,
//       messages: [{ value: hash + value }],
//     });

//     // Retornar o valor encriptado
//     return hash + value;
//   }

//   // Método para comparar um valor com um texto encriptado recebido do Kafka
//   async compare(value: string, hashedText: string): Promise<boolean> {
//     // Extrair o hash do texto encriptado
//     const hash = hashedText.substring(0, hashedText.length - value.length);

//     // Encriptar o valor com o mesmo hash
//     const encryptedValue = hash + value;

//     // Comparar o valor encriptado com o texto encriptado
//     return encryptedValue === hashedText;
//   }
// }
// import fastify from "fastify";
// import fastifyKafka from "fastify-kafka";

// // Criar uma instância do Fastify
// const app = fastify();
// app.register(fastifyKafka, {
//   producer: {
//     "metadata.broker.list": "localhost:9092",
//   },
//   consumer: {
//     "group.id": "fastify-group",
//     "metadata.broker.list": "localhost:9092",
//   },
//   consumerTopicConf: {
//     "auto.offset.reset": "earliest",
//   },
//   producerTopicConf: {
//     "request.required.acks": 1,
//   },
//   topics: ["producer-topic", "consumer-topic"],
// });
// const kafkaAdapter = new KafkaAdapter(app.kafka, "producer-topic", "consumer-topic");
