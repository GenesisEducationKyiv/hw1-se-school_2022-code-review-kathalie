import fetch from 'node-fetch';

import {Ports} from "../../../common/constants/ports.js";
import {ApiPaths} from "../../../common/constants/api-paths.js";
import {rootEmail} from "../../../logging-service/src/di.logging.js";

const log = rootEmail.getChildCategory("Rate Fetcher");

export class RateFetcher {
    static async getRate() {
        try {
            const response = await fetch(`http://localhost:${Ports.RATE_SERVER_PORT}/api/${ApiPaths.GET_RATE}`);

            if (!response.ok) {
                throw new Error(`Error while getting rate. Status: ${response.status}`);
            }

            const jsonResponse = await response.json();

            log.debug(`Successfully fetched Rate Service and received rate: ${jsonResponse}`);

            return jsonResponse;
        } catch (error) {
            log.error(`Failed to get rate from Rate Service`);

            throw new Error(error as string)
        }
    }
}