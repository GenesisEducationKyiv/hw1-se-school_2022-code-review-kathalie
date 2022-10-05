import {CoinCapChain, CoinGeckoChain, CryptoCompareChain, FawazahmedChain, IRateChain} from "./rate-chain.js";

export interface IRateChainCreator {
    createRateChain(): IRateChain;
}

export class CryptoCompareChainCreator implements IRateChainCreator {
    createRateChain() {
        return new CryptoCompareChain();
    }
}

export class CoinCapChainCreator implements IRateChainCreator {
    createRateChain() {
        return new CoinCapChain();
    }
}

export class CoinGeckoChainCreator implements IRateChainCreator {
    createRateChain() {
         return new CoinGeckoChain();
    }
}

export class FawazahmedRateChainCreator implements IRateChainCreator {
    createRateChain() {
        return new FawazahmedChain();
    }
}
