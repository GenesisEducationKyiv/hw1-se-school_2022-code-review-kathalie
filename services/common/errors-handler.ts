import {UserEmailAlreadyExistsError} from "../email-service/src/common/exceptions/email-exists-error.js";
import {HttpStatusCodes} from "./constants/http-status-codes.js";
import {InvalidEmailError} from "../email-service/src/common/exceptions/invalid-email-error.js";

export function handleEmailError(err, res, endpointLog = null) {
    if (err instanceof UserEmailAlreadyExistsError) {
        if (endpointLog) endpointLog.error(err.message);

        res.status(HttpStatusCodes.CONFLICT).json(err);
    }

    else if (err instanceof InvalidEmailError) {
        if (endpointLog) endpointLog.error(err.message);

        res.status(HttpStatusCodes.BAD_REQUEST).json(err);
    }

    else {
        if (endpointLog) endpointLog.error(err as string);

        res.status(HttpStatusCodes.INTERNAL_SERVICE_ERROR).json(err);
    }
}

