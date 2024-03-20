import { Api, ResponseWitchCount } from "./api";
import { BasketSchema } from "entities/Basket";

class BasketApi extends Api {
    async getAll(userId: string | number) {
        return this._api.get<ResponseWitchCount<BasketSchema[]>>(
            `products${this.parseQuery({ userId })}`
        );
    }

    async getAmount(userId: string | number) {
        return this._api
            .get<number>(`basket/amount${this.parseQuery({ userId })}`)
            .then((res) => res.data);
    }

    async add(userId: string | number, productId: string | number) {
        return this._api.post<null>(
            `basket/add${this.parseQuery({ userId, productId })}`
        );
    }
}

const basketApi = new BasketApi();
export { basketApi };
