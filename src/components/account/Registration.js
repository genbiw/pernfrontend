import { useContext, useState } from "react"
import GenderDropdown from "./GenderDropdown"
import "./Registration.css"

export const Registration = ({name, setName, country, setCountry, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, phone, setPhone, optIn, setOptIn}) => {

    return (
        <form className='auth-page__form'>
            <input className='form__input' placeholder='Enter your name' value={name} onChange={e => setName(e.target.value)} />
            <GenderDropdown />
            <input className='form__input' placeholder='Enter your country' value={country} onChange={e => setCountry(e.target.value)} />
            <input className='form__input' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
            <input className='form__input' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} type='password' />
            <input className='form__input' placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type='password' />
            <input className='form__input' placeholder='Enter phone' value={phone} onChange={e => setPhone(e.target.value)} />
            <div className="optIn"> 
                <input className="optInCheckBox" type="checkbox" name="checkbox" value={optIn} onChange={e => setOptIn(e.target.value)} id="optInWA" />
                <div>I would like to receive notifications via Messages</div>
            </div>
        </form>
    )
}

export const Authorisation = ({email, setEmail, password, setPassword}) => {

    return (
        <form className='auth-page__form'>
            <input className='form__input' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
            <input className='form__input' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} type='password' />
        </form>
    )
}