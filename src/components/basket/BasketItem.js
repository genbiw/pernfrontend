import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../../utils/const';
import "./BasketItem.css"
import Minus from "../../assets/minus.png"
import { Plus, Garbage, Map, Delivery } from '../../utils/elements';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { deleteDevice } from "../../http/basketAPI"
import SectionLoading from "../../components/loading/SectionLoading"

const BasketItem = observer(({ itemId, quantity, setBasketModify }) => {

    const { user, device, basket } = useContext(Context)

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const foundDevice = device.devices.find(data => data.id === itemId);
    const price = foundDevice ? foundDevice.price : null;
    const img = foundDevice ? foundDevice.img : null;
    const name = foundDevice ? foundDevice.name : null;

    const navigate = useNavigate()

    const addDeviceToTheBasket = () => {
        setBasketModify(true)
        basket.increaseQuantity(itemId)
    }

    const reduceQuantity = () => {
        setBasketModify(true)
        basket.decreaseQuantity(itemId)
    }

    const deleteDeviceFromBasket = async () => {
        if(user.isAuth === true){
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000)); //manual delay
                const response = await deleteDevice(user.user.id, itemId)
                basket.removeItem(itemId)
                setData(response);
            } catch (e) {
                alert(e)
            } finally {
                setLoading(false);
            }
        }else{
            basket.removeItem(itemId)
            localStorage.setItem("basket", JSON.stringify(basket))
        }
    }

    return (
        <div className="basket-item">
            {loading && <SectionLoading />}
            <div className='basket-item__content'>
                <div className='basket-item__content-description'>
                    <img alt='basket-item-img' className="basket-item__img" src={process.env.REACT_APP_API_URL + img} onClick={() => navigate(DEVICE_ROUTE + "/" + itemId)} />
                    <div className='content__description'>
                        <div className="basket-item__item item__name">{name}</div>
                        <div className="basket-item__item item__price">{price} Euro</div>
                    </div>
                </div>
                <div className='basket-item__content-delivery'>
                    <div className='delivery-items'>
                        <div className='delivery-item'><Map /></div>
                        <div className='delivery-item'>Pickup today</div>
                    </div>
                    <div className='delivery-items'>
                        <div className='delivery-item'><Delivery /></div>
                        <div className='delivery-item'>Delivery tomorrow</div>
                    </div>
                </div>
            </div>
            <div className='basket-item__characteristics'>
                {quantity === 1
                    ? <div className='garbage' src={Minus} onClick={deleteDeviceFromBasket}><Garbage /></div>
                    : <div className='minus'><img alt='minus-img' src={Minus} onClick={reduceQuantity} /></div>
                }


                <div className='quantity'>{quantity}</div>
                <div className='plus' onClick={addDeviceToTheBasket}><Plus /></div>

            </div>
        </div>

    );
});

export default BasketItem; 