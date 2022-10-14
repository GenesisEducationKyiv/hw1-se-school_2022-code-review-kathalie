import {getLogger} from "./configs/logging.config.js";
import {LoggingCategories} from "./constants/logging-categories.js";
import {RabbitMQ} from "./rabbitmq/rabbitmq.js";
import {RabbitMQProducer} from "./rabbitmq/producer.js";
import {RabbitMQConsumer} from "./rabbitmq/consumer.js";
import {RabbitMQConfigs} from "./constants/rabbitmq-configs.js";

const rabbitMQ = new RabbitMQ(RabbitMQConfigs.HOST);
export const producer = new RabbitMQProducer(rabbitMQ);
export const consumer = new RabbitMQConsumer(rabbitMQ);

export const rootEmail = getLogger(LoggingCategories.EmailService);
export const rootRate = getLogger(LoggingCategories.RateService);