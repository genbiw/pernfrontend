import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../index";
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import "./CreateDevice.css"


const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", `${price}`)
        formData.append("img", file)
        formData.append("brandId", device.selectedBrand.id)
        formData.append("typeId", device.selectedType.id)
        formData.append("info", JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <div className={`custom-modal ${show ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <div className='main-block'>
                    <div className='dropdown'>
                        <div className='selected-option'>{device.selectedType.name || "Choose type"}</div>
                        <div className='dropdown-content'>
                            {device.types.map(type =>
                                <div className='dropdown-content__item' onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</div>
                            )}
                        </div>
                    </div>
                    <div className='dropdown'>
                        <div className='selected-option'>{device.selectedBrand.name || "Choose brand"}</div>
                        <div className='dropdown-content'>
                            {device.brands.map(brand =>
                                <div className='dropdown-content__item' onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</div>
                            )}
                        </div>
                    </div>
                    <input className='modal-input' placeholder='Enter device name' value={name} onChange={e => setName(e.target.value)} />
                    <input className='modal-input' placeholder='Enter device price' type='number' value={price} onChange={e => setPrice(Number(e.target.value))} />
                    <input className='modal-input' type='file' onChange={selectFile} />
                    <hr className='delimiter' />
                    <div className='block-new-parameters'>
                        <div className='button-parameter' onClick={addInfo}>Add new parameter</div>
                        {
                            info.map(i =>
                                <div className='block-parameter-value' key={i.number}>

                                    <div className='block-parameter-value-description'>
                                        <div className='parameter-value'>
                                            <input className='enter-parametr' placeholder='Enter parametr name' value={i.title} onChange={e => changeInfo("title", e.target.value, i.number)} />
                                        </div>
                                        <div className='parameter-value'>
                                            <input className='enter-parametr' placeholder='Enter parametr description' value={i.description} onChange={e => changeInfo("description", e.target.value, i.number)} />
                                        </div>
                                    </div>

                                    <div className='block-parameter-value-button'>
                                        <button className='button-modal' onClick={() => removeInfo(i.number)}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='button button-modal' onClick={onHide}>Close</button>
                    <button className='button button-modal' onClick={addDevice}>Add</button>
                </div>
            </div>

        </div>
    );
});

export default CreateDevice; 