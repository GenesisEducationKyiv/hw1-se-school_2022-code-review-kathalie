import {IRateProviderCreator} from '../rate-providers-factory.js'
import {IRateProvider} from "../rate-providers.js";

export class RateService {
    private rateProvider: IRateProvider;

    constructor(rateProvider: IRateProviderCreator) {
        this.rateProvider = rateProvider.createRateProvider();
    }

    public async getRate() {
        try {
            return this.rateProvider.getRate();
        } catch (err) {
            console.log('Rate Service Error', err);

            throw err;
        }
    }
}