import React, { useContext, useEffect } from 'react';
import { Context } from '../../index';
import BasketItem from '../../components/basket/BasketItem';
import { observer } from 'mobx-react-lite';
import { getBasket, createCheckOutSession } from '../../http/basketAPI';
import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import "./Basket.css"
import { Coins, Card, Wallet, Bank, PaymentAtDelivery } from "../../utils/elements"

const Basket = observer(() => {
    const { basket, user, device } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 30).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        getBasket(user.user.id).then(data => basket.setItems(data))
    }, [basket, device])

    const basketDevices = basket.items.map(data => {
        const deviceData = device.devices.find(d => d.id === data.deviceId)
        if (deviceData) {
            return {
                ...deviceData,
                quantity: data.quantity,
                userId: user.user.id
            };
        }
        return null;
    }).filter(Boolean)

    const stripeCheckOut = async () => {
        try {
            const checkOutURL = await createCheckOutSession(user.user.id)
            window.location.href = checkOutURL
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='container'>
            <div className='basket-page'>
                <div className='basket-left'>
                    {basketDevices.length !== 0 ?
                        basketDevices.map((device, index) =>
                            <BasketItem key={device.id} device={device} />)
                        : <div className='basketempty'>Basket is empty</div>
                    }
                </div>
                <div className='basket-right'>
                    <div className='payment-method-section'>
                        <div className='payment-method-section__title'>
                            <div><Coins/></div>
                            <div>Payment methods</div>
                        </div>
                        <div className='payment-method-section__content'>
                            <div className='content__item'>
                                <div className='content__item-icon'><Card/></div>
                                <div>Bank Cart</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><Wallet/></div>
                                <div>Installment / loan with down payment</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><Bank/></div>
                                <div>Installment / loan</div>
                            </div>
                            <div className='content__item'>
                                <div className='content__item-icon'><PaymentAtDelivery/></div>
                                <div>Payment upon receipt is not available, since the order contains goods that can only be purchased by paying by card online or by installments/credit</div>
                            </div>
                        </div>
                    </div>
                    <div className='to-be-paid-section'>
                        <div className='section__content'>
                            <div className='content__price'>
                                <div>Amount to be paid</div>
                                <div>5110 Euro</div>
                            </div>
                            <div className='content__amount'>12 Items</div>
                        </div>
                        <div className='section__button' onClick={stripeCheckOut} type="submit">Checkout</div>
                    </div>
                </div>



            </div>
        </div>
    );
});

export default Basket;