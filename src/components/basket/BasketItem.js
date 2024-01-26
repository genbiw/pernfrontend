import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../../utils/const';
import { deleteDevice, deleteAllDevices, addDevice } from '../../http/basketAPI';
import "./BasketItem.css"
import Minus from "../../assets/minus.png"
import { Plus, Garbage, Map, Delivery } from '../../utils/elements';
import { Context } from '../..';

const BasketItem = ({ device }) => {
    const navigate = useNavigate()
    const id = device.id
    const userId = device.userId

    const reduceQuantity = () => {
        const response = deleteDevice(device.userId, device.id)
    }

    const removeDevice = () => {
        const response = deleteAllDevices(device.userId)
    }

    const addDeviceToTheBasket = async () => {
        try {
            let data
            data = await addDevice(userId, id)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="basket-item">
                <div className='basket-item__content'>
                    <div className='basket-item__content-description'>
                        <img className="basket-item__img" src={process.env.REACT_APP_API_URL + device.img} onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)} />
                        <div className='content__description'>
                            <div className="basket-item__item item__name">{device.name}</div>
                            <div className="basket-item__item item__price">{device.price} Euro</div>
                        </div>
                    </div>
                    <div className='basket-item__content-delivery'>
                        <div className='delivery-items'>
                            <div className='delivery-item'><Map/></div>
                            <div className='delivery-item'>Pickup today</div>
                        </div>
                        <div className='delivery-items'>
                            <div className='delivery-item'><Delivery/></div>
                            <div className='delivery-item'>Delivery tomorrow</div>
                        </div>
                    </div>
                </div>
                <div className='basket-item__characteristics'>
                    {device.quantity === 1
                        ? <div className='garbage' src={Minus} onClick={removeDevice}><Garbage /></div>
                        : <div className='minus'><img src={Minus} onClick={reduceQuantity} /></div>
                    }


                    <div className='quantity'>{device.quantity}</div>
                    <div className='plus' onClick={addDeviceToTheBasket}><Plus /></div>

                </div>
        </div>

    );
};

export default BasketItem; 