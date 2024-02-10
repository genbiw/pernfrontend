import { makeAutoObservable } from "mobx";

export default class BasketStore {
    constructor() {
        this._items = [];
        makeAutoObservable(this);
    }

    setItems(items) {
        this._items = items;
    }

    addItem(item) {
        const existingItem = this._items.find((i) => i.deviceId === item.deviceId);
        if (existingItem) {
            existingItem.quantity += 1;
        } 
        else {
            this._items.push({ ...item, quantity: 1 });
        }
    }

    removeItem(id) {
        this._items = this._items.filter((i) => i.deviceId !== id);
    }

    clearBasket() {
        this._items = [];
    }

    increaseQuantity(id) {
        const existingItem = this._items.find((i) => i.deviceId === id);

        if (existingItem) {
            existingItem.quantity++
        }
    }

    decreaseQuantity(id) {
        const existingItem = this._items.find((i) => i.deviceId === id);

        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--
        }
    }

    get items() {
        return this._items;
    }

    get basketCount() {
        return this._items.reduce((count, item) => count + item.quantity, 0);
    }

}