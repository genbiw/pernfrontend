import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import "./TypeBar.css"
 
const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className='type-bar'>
            {<div className={`type-bar__item ${device.selectedType === "" ? 'type-bar__item--active' : ''}`} onClick={() => device.setSelectedType("")} active={device.selectedType === ""} key={0}>All</div>}
            {device.types.map(type =>
                <div className={`type-bar__item ${type.id === device.selectedType.id ? 'type-bar__item--active' : ''}`} active={type.id === device.selectedType.id} onClick={() => device.setSelectedType(type)} key={type.id}>
                    {type.name}
                </div>
            )}
        </div>
    );
});

export default TypeBar;