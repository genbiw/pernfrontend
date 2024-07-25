import React, { useContext, useEffect } from 'react'; 
import TypeBar from '../../components/type/TypeBar';
import BrandBar from '../../components/brand/BrandBar';
import DeviceList from '../../components/device/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import Pages from '../../components/Pages';
import "./Shop.css"

const Shop = observer(() => {
    const {device} = useContext(Context)  

    useEffect(() => { 
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <div className='container'>
            <div className='shop'>
                <div className='shop__type-bar'>
                    <TypeBar/>
                </div>
                <div className='shop__content'>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </div>
            </div>
        </div>
    );
});

export default Shop; 