import {Channel, Message} from "amqplib";

import {RabbitMQConfigs} from "../constants/rabbitmq-configs.js";
import {RabbitMQ} from "./rabbitmq.js";

export class RabbitMQConsumer {
    rabbitmq: RabbitMQ;

    constructor(rabbitmq: RabbitMQ) {
        this.rabbitmq = rabbitmq;
    }

    async consume() {
        const channel: Channel = await this.rabbitmq.createChannel();

        await channel.consume(
            RabbitMQConfigs.QUEUE_NAME,
            async (data: Message | null) => {
                if (data) {
                    const msg = JSON.parse(data.content.toString());
                    console.log(msg);
                }
            },
            { noAck: true }
        );
    }
}

