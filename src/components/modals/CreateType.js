import React, { useState } from 'react';
import { createType } from '../../http/deviceAPI';

const CreateType = ({ show, onHide }) => {

    const [value, setValue] = useState("")

    const addType = () => {
        createType({ name: value }).then(data => setValue(""))
        onHide()
    }

    return (
        <div className={`custom-modal ${show ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title"> Add type</div>
                </div>
                <div className="modal-body">
                    <input placeholder="Enter type name" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                <div className="modal-footer">
                    <button className='button button-modal' onClick={onHide}>Close</button>
                    <button className='button button-modal' onClick={addType}>Add</button>
                </div>
            </div>

        </div>
    );
};

export default CreateType; 