export class RateService {
    private apiVersion = 1;
    private date = 'latest';
    private currencyFrom = 'btc';
    private currencyTo = 'uah';

    private apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${this.apiVersion}/${this.date}/currencies/${this.currencyFrom}.json`;

    public async getRate() {
        try {
            const rateResponse = await this.getResponseFromOuterAPI(this.apiUrl);
            const jsonRateResponse = await rateResponse.json();
            const uahRate = jsonRateResponse[this.currencyFrom][this.currencyTo];

            return uahRate;
        } catch (err) {
            console.log('Rate Service Error', err);

            throw err;
        }
    }

    private async getResponseFromOuterAPI(url) {
        const fetch = await import('node-fetch');

        return await fetch.default(url);
    }
}