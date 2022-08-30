import * as rateService from '../services/rateService.js';

async function getRate(res) {
    try {
        const currentRate = await rateService.getRate();
        // 200 можна винести в об'єкт з кодами
        res.status(200).send(currentRate);
    } catch (err) {
        // 500 можна винести в об'єкт з кодами
        res.status(500).json(err);
    }
}

export {getRate};