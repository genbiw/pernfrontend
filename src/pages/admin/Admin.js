import React, { useState } from 'react';
import CreateType from '../../components/modals/CreateType';
import CreateBrand from '../../components/modals/CreateBrand';
import CreateDevice from '../../components/modals/CreateDevice';
import "./Admin.css"

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <div className='admin-page__container'>
            <div className='admin-page'>
                <div className='admin-button' onClick={() => setTypeVisible(true)}>Add type</div>
                <div className='admin-button' onClick={() => setBrandVisible(true)}>Add brand</div>
                <div className='admin-button' onClick={() => setDeviceVisible(true)}>Add device</div>
                <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
                <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            </div>

        </div>


    );
};

export default Admin; 