export interface IRateChain {
    next;

    getRate();

    setNext(next: IRateChain);
}

export class RateChain implements IRateChain {
    next: IRateChain;

    getRate() {
        let rate;

        try {
            rate = this.next.getRate();
        } catch (err) {
            this.next = this.next.next;

            if (!this.next)
                // TODO change with custom error
                throw err;

            rate = this.next.getRate();
        }

        return rate;
    }

    setNext(next: IRateChain) {
        this.next = next;
    }
}