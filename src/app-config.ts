import {RateChain} from "./services/rate-chain.js";
import {
    SimpleSwapProviderCreator,
    FawazahmedRateProviderCreator,
    CoinCapProviderCreator
} from "./services/rate-providers-factory.js";
import {RateService} from "./services/api/rate-service.js";
import {RateController} from "./controllers/rate-controller.js";
import {EmailRepository} from "./repositories/email-repository.js";
import {JsonFileManager} from "./file-managers/json-file-manager.js";
import {FileNames} from "./constants/file-names.js";
import {EmailService} from "./services/api/email-service.js";
import {EmailController} from "./controllers/email-controller.js";

const rateChain1 = new RateChain();
const rateChain2 = new RateChain();
const rateChain3 = new RateChain();
rateChain1.setNext(rateChain2);
rateChain2.setNext(rateChain3);

process.env.CRYPTO_CURRENCY_PROVIDER = 'coin_cap';

let rateProviderCreator;
if (process.env.CRYPTO_CURRENCY_PROVIDER.toLowerCase() == 'fawazahmed')
    rateProviderCreator = new FawazahmedRateProviderCreator();
else if (process.env.CRYPTO_CURRENCY_PROVIDER.toLowerCase() == 'coin')
    rateProviderCreator = new SimpleSwapProviderCreator();
else if (process.env.CRYPTO_CURRENCY_PROVIDER.toLowerCase() == 'coin_cap')
    rateProviderCreator = new CoinCapProviderCreator();
else
    rateProviderCreator = new FawazahmedRateProviderCreator();

export {rateProviderCreator};

export const rateService = new RateService(rateProviderCreator);
export const rateController = new RateController(rateService);

export const emailRepository = new EmailRepository(new JsonFileManager(FileNames.SUBSCRIBERS));
export const emailService = new EmailService(emailRepository, rateService);
export const emailController = new EmailController(emailService);