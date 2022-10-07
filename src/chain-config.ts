import {RateProviders} from "./common/constants/rate-providers.js";
import {getAllChains} from "./data-access/rate-providers/rate-chain.js";
import {
    CoinCapChainCreator, CoinGeckoChainCreator,
    CryptoCompareChainCreator, FawazahmedRateChainCreator,
    IRateChainCreator
} from "./data-access/rate-providers/rate-chain-factory.js";
import {IRateChain} from "./services/api/rate-service.js";


process.env.CRYPTO_CURRENCY_PROVIDER = RateProviders.CRYPTO_COMPARE;

function getDefaultRateChain():IRateChain {
    let rateProviderCreator: IRateChainCreator;
    const defaultRateProvider = process.env.CRYPTO_CURRENCY_PROVIDER.toLowerCase();

    switch(defaultRateProvider) {
        case RateProviders.CRYPTO_COMPARE: rateProviderCreator = new CryptoCompareChainCreator(); break;
        case RateProviders.COIN_CAP: rateProviderCreator = new CoinCapChainCreator(); break;
        case RateProviders.COIN_GECKO: rateProviderCreator = new CoinGeckoChainCreator(); break;
        case RateProviders.FAWAZAHMED: rateProviderCreator = new FawazahmedRateChainCreator(); break;
        default: rateProviderCreator = new CoinCapChainCreator();
    }

    return rateProviderCreator.createRateChain();
}

function getChainsInRightOrder(): IRateChain[] {
    const allChains: IRateChain[] = getAllChains();
    const defaultChain = getDefaultRateChain();

    const orderedChains = [];
    orderedChains.push(defaultChain);
    allChains
        .filter(chain => !chain.equals(defaultChain))
        .forEach(chain => orderedChains.push(chain));

    return orderedChains;
}

function initRateProvidersChain(orderedChains: IRateChain[]) {
    for (let i=0; i<orderedChains.length; i++) {
        orderedChains[i].setNext(orderedChains[i+1]);
    }
}

export function getRateChain() {
    const orderedChains = getChainsInRightOrder();

    initRateProvidersChain(orderedChains);

    return orderedChains[0];
}