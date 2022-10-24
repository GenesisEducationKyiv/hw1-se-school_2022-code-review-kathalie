import {getLogger} from "./configs/logging.config.js";
import {LoggingCategories} from "./common/constants/logging-categories.js";
import {RabbitMQ} from "../../common/rabbitmq/rabbitmq.js";
import {RabbitMQProducer} from "../../common/rabbitmq/producer.js";
import {RabbitMQConsumer} from "../../common/rabbitmq/consumer.js";
import {RabbitMQConfigs} from "./common/constants/rabbitmq-configs.js";

const rabbitMQ = new RabbitMQ(RabbitMQConfigs.HOST, RabbitMQConfigs.QUEUE_NAME);
export const producer = new RabbitMQProducer(rabbitMQ);
export const consumer = new RabbitMQConsumer(rabbitMQ);

export const rootEmail = getLogger(LoggingCategories.EmailService);
export const rootRate = getLogger(LoggingCategories.RateService);
export const rootCustomer = getLogger(LoggingCategories.CustomerService);