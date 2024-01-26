import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import DeviceItem from './DeviceItem';
import "./DeviceList.css"

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className='device-list'>
            <div className='device-list__container'>
            {device.devices.map(device => 
                <DeviceItem key={device.id} device={device}/>
                )}
            </div>
        </div>
    );
});

export default DeviceList; 