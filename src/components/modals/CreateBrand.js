import React, { useState  } from 'react';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState("")

    const addBrand = () => {
        createBrand({ name: value }).then(data => setValue(""))
        onHide()
    }

    return (
        <div className={`custom-modal ${show ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">Add brand</div>
                </div>
                <div className="modal-body">
                    <input type='text' placeholder="Enter brand name" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                <div className="modal-footer">
                    <button className='button button-modal' onClick={onHide}>Close</button>
                    <button className='button button-modal' onClick={addBrand}>Add</button>
                </div>
            </div>

        </div>
    );
};

export default CreateBrand;