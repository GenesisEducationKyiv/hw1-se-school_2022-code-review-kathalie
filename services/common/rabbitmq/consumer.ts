import {Channel, Message} from "amqplib";

import {RabbitMQ} from "./rabbitmq.js";

export class RabbitMQConsumer {

    constructor(private rabbitmq: RabbitMQ) {}

    async consume() {
        const channel: Channel = await this.rabbitmq.createChannel();
        const queueName: string = this.rabbitmq.getQueueName();

        await channel.consume(
            queueName,
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

