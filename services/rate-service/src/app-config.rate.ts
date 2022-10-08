import {RateRounder} from "./presenters/rate-presenter.js";
import {getRateChain} from "../chain-config.js";
import {RateService} from "./services/rate-service.js";
import {RateCache} from "./services/cache/rate-cache.js";
import {RateController} from "./controllers/rate-controller.js";
import {RateServiceConfigs} from "./common/constants/rate-service-configs.js";

const ratePresenter = new RateRounder(RateServiceConfigs.PRECISION);
export const rateChain = getRateChain();
export const rateService = new RateService(new RateCache(rateChain), ratePresenter);
export const rateController = new RateController(rateService);