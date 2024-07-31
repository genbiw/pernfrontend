import GenderDropdown from "./GenderDropdown"
import "./Registration.css"
 
export const Registration = ({userName, setUserName, age, setAge, country, setCountry, city, setCity, address, setAddress, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, phoneNumber, setPhoneNumber, optIn, setOptIn, gender, setGender}) => {

    return (
        <form className='auth-page__form'> 
            <input className='form__input' placeholder='Enter your name' value={userName} onChange={e => setUserName(e.target.value)} />
            <GenderDropdown 
                gender = {gender}
                setGender = {setGender}
            />
            <input className='form__input' placeholder='Enter your age' value={age} onChange={e => setAge(e.target.value)} />
            <input className='form__input' placeholder='Enter your country' value={country} onChange={e => setCountry(e.target.value)} />
            <input className='form__input' placeholder='Enter your city' value={city} onChange={e => setCity(e.target.value)} />
            <input className='form__input' placeholder='Enter your address' value={address} onChange={e => setAddress(e.target.value)} />
            <input className='form__input' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
            <input className='form__input' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} type='password' />
            <input className='form__input' placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type='password' />
            <input className='form__input' placeholder='Enter phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
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