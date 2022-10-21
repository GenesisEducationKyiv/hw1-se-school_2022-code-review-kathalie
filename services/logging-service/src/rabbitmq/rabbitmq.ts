import {Connection} from "amqplib";
import * as amqp from "amqplib";

import {RabbitMQConfigs} from "../constants/rabbitmq-configs.js";

export class RabbitMQ {
    host: string;

    constructor(host: string) {
        this.host = host;
    }

    async createChannel() {
        try {
            const connection: Connection = await amqp.connect(RabbitMQConfigs.HOST);

            const channel = await connection.createChannel();
            await channel.assertQueue(RabbitMQConfigs.QUEUE_NAME);

            return channel;
        } catch(err) {
            console.log(err);

            throw err;
        }
    }
}