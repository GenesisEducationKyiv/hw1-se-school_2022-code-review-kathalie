import * as amqp from "amqplib";

export class RabbitMQ {

    constructor(private host: string, private queueName: string) {}

    getQueueName() {
        return this.queueName;
    }

    async createChannel() {
        try {
            const connection: amqp.Connection = await amqp.connect(this.host);

            const channel = await connection.createChannel();
            await channel.assertQueue(this.queueName);

            return channel;
        } catch(err) {
            console.log(err);

            throw err;
        }
    }
}
