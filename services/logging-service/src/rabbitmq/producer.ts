import {Channel} from "amqplib";

import {RabbitMQConfigs} from "../constants/rabbitmq-configs.js";
import {RabbitMQ} from "./rabbitmq.js";

export class RabbitMQProducer {
    rabbitmq: RabbitMQ;

    constructor(rabbitmq: RabbitMQ) {
        this.rabbitmq = rabbitmq;
    }

    async produce(data) {
        const channel: Channel = await this.rabbitmq.createChannel();

        const msg = JSON.stringify(data);

        channel.sendToQueue(RabbitMQConfigs.QUEUE_NAME, Buffer.from(msg));
    }
}