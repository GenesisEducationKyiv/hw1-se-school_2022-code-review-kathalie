import { InvalidRateError } from "../../../exceptions/invalid-rate-error.js";
import { IRateProvider } from "../rate-providers.js";
import {rateLogger} from "../../../file-managers/rate-logger.js";

export class RateProviderLogger implements IRateProvider {
    rateProvider: IRateProvider;

    constructor(rateProvider: IRateProvider) {
        this.rateProvider = rateProvider;
    }

    async getRate() {
        let rate;

        try {
            rate = await this.rateProvider.getRate();
        } catch(err) {
            if (err instanceof InvalidRateError) {
                rateLogger.write(this.formLogLine('NaN'));

                throw err;
            }

            rateLogger.write(this.formLogLine('failed'));
        }

        rateLogger.write(this.formLogLine(`Response: ${rate}\n`));

        return rate;
    }

    private formLogLine(result) {
        const now = new Date();
        const date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
        const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        return `${date} ${time}: ${this.getName()} - ${result}\n`
    }

    getName(): string {
        return this.rateProvider.getName();
    }
}