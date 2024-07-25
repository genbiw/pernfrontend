import React from 'react';
import start from "../../assets/star.png"
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../../utils/const';
import "./DeviceItem.css"
 
const DeviceItem = ({ device }) => {
    const navigate = useNavigate()
    console.log(device)
    return (
        <div md={3} className='device-list__item' onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <div className='device-item'>
                <div className="device-item__img">
                    <img alt='device-img' src={process.env.REACT_APP_API_URL + device.img} />
                </div>
                <div className='device-item__raiting'>
                    <div className='device-list__raiting-title'>{device.rating}</div>
                    <div className='raiting__img'>
                        <img alt='raiting-img' width={15} height={15} src={start} />
                    </div>
                </div>
                <div className='device-item__title'>
                    {device.name}
                </div>
            </div>
        </div>
    );
};

export default DeviceItem;