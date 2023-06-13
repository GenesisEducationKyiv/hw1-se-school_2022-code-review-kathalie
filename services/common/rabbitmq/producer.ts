import {Channel} from "amqplib";

import {RabbitMQ} from "./rabbitmq.js";

export class RabbitMQProducer {

    constructor(private rabbitmq: RabbitMQ) {}

    async produce(data) {
        const channel: Channel = await this.rabbitmq.createChannel();

        const msg = JSON.stringify(data);

        channel.sendToQueue(this.rabbitmq.getQueueName(), Buffer.from(msg));
    }
}