import { makeAutoObservable } from "mobx";

export default class BasketStore {
    constructor() {
        this._items = [];
        this._totalPrice = 0;
        makeAutoObservable(this);
    }

    setItems(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }

}