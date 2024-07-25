import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import "./BrandBar.css"

const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <div className='brand-bar'>
            {<div className={`brand-bar__item ${device.selectedBrand === "" ? "brand-bar__item--active" : ""}`} onClick={() => device.setSelectedBrand("")}>All</div>}
            {device.brands.map(brand =>
                <div className={`brand-bar__item ${brand.id === device.selectedBrand.id ? "brand-bar__item--active" : ""}`} key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                    {brand.name}
                </div>
            )}
        </div>
    );
});

export default BrandBar;  