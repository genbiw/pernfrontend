import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import BasketItem from '../../components/basket/BasketItem';
import { observer } from 'mobx-react-lite';
import { getBasket, updateDevice, createCheckOutSession } from '../../http/basketAPI';
import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import "./Basket.css"
import { Coins, Card, Wallet, Bank, PaymentAtDelivery } from "../../utils/elements"
import SectionLoading from '../../components/loading/SectionLoading';

const Basket = observer(() => {
    const { basket, user, device } = useContext(Context)
    const [basketModified, setBasketModify] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.isAuth) {
            getBasket(user.user.id).then(data => basket.setItems(data))
            fetchTypes().then(data => device.setTypes(data))
            fetchBrands().then(data => device.setBrands(data))
            fetchDevices(null, null, null, null).then(data => device.setDevices(data.rows))
        } else {
            fetchTypes().then(data => device.setTypes(data))
            fetchBrands().then(data => device.setBrands(data))
            fetchDevices(null, null, null, null).then(data => device.setDevices(data.rows))
        }

    }, [])

    console.log(basket)

    const totalPrice = () => {
        return basket.items.reduce((total, item) => {
            const deviceMapped = device.devices.find(data => data.id === item.deviceId);
            if (deviceMapped) {
                return total + item.quantity * deviceMapped.price;
            }
            return total;
        }, 0);
    }

    const stripeCheckOut = async () => {
        try {
            const checkOutURL = await createCheckOutSession(user.user.id)
            window.location.href = checkOutURL
        } catch (e) {
            console.error(e);
        }
    }

    const modifyBasket = async () => {
        try {
            setBasketModify(false)
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 3000)); //manual delay
            const updatedBasketPromises = basket.items.map(async (item) => {
                return await updateDevice(user.user.id, item.deviceId, item.quantity);
            });

            const updatedBasket = await Promise.all(updatedBasketPromises);

            // Вероятно, вам нужно что-то сделать с обновленной корзиной, прежде чем ее возвращать
            // Например, можно объединить элементы корзины в один массив
            const combinedUpdatedBasket = [].concat(...updatedBasket);

            return combinedUpdatedBasket;
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <div className='basket-page'>
                <div className='basket-left'>
                    {loading && <SectionLoading />}
                    {
                        basket.items.length !== 0 ?
                            basket.items.map((item) =>
                                <BasketItem key={item.deviceId} itemId={item.deviceId} quantity={item.quantity} setBasketModify={setBasketModify} />)
                            : <div className='basketempty'>Basket is empty</div>
                    }

                    {basketModified &&
                        <div className='basket-left__button' onClick={modifyBasket}>Confirm changes</div>
                    }

                </div>

                <div className='basket-right'>
                    <div className='payment-method-section'>
                        <div className='payment-method-section__title'>
                            <div><Coins /></div>
                            <div>Payment methods</div>
                        </div>
                        <div className='payment-method-section__content'>
                            <div className='content__item'>
                                <div className='content__item-icon'><Card /></div>
                                <div>Bank Cart</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><Wallet /></div>
                                <div>Installment / loan with down payment</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><Bank /></div>
                                <div>Installment / loan</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><PaymentAtDelivery /></div>
                                <div>Payment upon receipt is not available, since the order contains goods that can only be purchased by paying by card online or by installments/credit</div>
                            </div>
                        </div>
                    </div>
                    <div className='to-be-paid-section'>
                        <div className='section__content'>
                            <div className='content__price'>
                                <div>Amount to be paid</div>
                                <div>{totalPrice()}</div>
                            </div>
                            <div className='content__amount'>{basket.basketCount}</div>
                        </div>
                        <div className='section__button' onClick={stripeCheckOut} type="submit">Checkout</div>
                    </div>
                </div>



            </div>
        </div>
    );
});

export default Basket;