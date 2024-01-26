import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { fetchOneDevices } from '../../http/deviceAPI';
import "./DevicePage.css"
import { addDevice } from '../../http/basketAPI';
import { Context } from '../../index';
import { Star } from "../../utils/elements"

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] })
    const { id } = useParams()
    const { user } = useContext(Context)
    const userId = user.user.id

    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data))
    }, [])

    const addDeviceToTheBasket = async () => {
        try {
            let data
            data = await addDevice(userId, id)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className='device-page'>
            <div className='device-page__main-row'>
                <div className='device-page__column-left'>
                    <div>
                        <div className='device-page__title'>
                            <div>{device.name}</div>
                            <div className='device-page__raiting'>
                                <div className='raiting__number'>
                                    {device.rating}
                                </div>
                                <div className='raiting__star' ><Star/></div>
                            </div>
                        </div>
                        <img className="device-page__img" src={process.env.REACT_APP_API_URL + device.img} />
                    </div>
                    <div className='device-page__description'>
                        <div className='description__title'>Description</div>
                        <div className='description__items'>
                            <div className='description__item'>
                                <div className='item-name'>Model year</div>
                                <div className='dots'></div>
                                <div>2023</div>
                            </div>
                            <div className='description__item'>
                                <div className='item-name'>Display diagonal, inch</div>
                                <div className='dots'></div>
                                <div>6.1</div>
                            </div>
                            <div className='description__item'>
                                <div className='item-name'>Display resolution</div>
                                <div className='dots'></div>
                                <div>1080x2640</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='device-page__column-right' >
                    <div className='device-page__price'>
                        <div className='price__number'>{device.price} Eur</div>
                        <div className='button device-page__button' onClick={addDeviceToTheBasket}>Add to the basket</div>
                    </div>
                </div>
            </div>
            <div className='device-page__characteristics'>
                <div className='characteristics__title'>Characteristics</div>
                {device.info.map((info, index) => 
                <div key={info.id} className='characteristics-items'>
                    <div className='characteristics-item-name'>{info.title}</div>
                    <div className='dots'></div>
                    <div className='characteristics-item'>{info.description}</div>
                </div>

                )}
            </div>

        </div>
    );
};

export default DevicePage; 