import {PortsEmail} from "../common/constants/ports.email";
import {ApiPaths} from "../../../common/constants/api-paths";

export class RateFetcher {
    static async getRate() {
        try {
            const response = await fetch(`http://localhost:${PortsEmail.EMAIL_SERVER_PORT}/api/${ApiPaths.GET_RATE}`);

            if (!response.ok) {
                console.log(`Failed to get rate. ${response.status} status received.`);

                throw new Error(`Error while getting price! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(error as string)
        }
    }
}