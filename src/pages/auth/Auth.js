import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/const';
import { login, registration } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { SHOP_ROUTE } from "../../utils/const"
import { Registration, Authorisation } from '../../components/account/Registration';
import "./Auth.css"

import { initializePeopleSDK, createPerson } from "../../http/infobipPeople"

const Auth = observer(() => {

    useEffect(() => {
        initializePeopleSDK("ff72a37f5301476f082cdbc60297da8a-be3d0a17-f2bf-460b-b2b8-48196cedec25")
    }, [])

    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [userName, setUserName] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [optIn, setOptIn] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState("")

    const click = async () => {
        try {
            let data;
            let createPersonData;

            if (isLogin) {
                if (!email) {
                    window.alert("Enter email");
                    return;
                }
                if (!password) {
                    window.alert("Enter password");
                    return;
                }

                data = await login(email, password);
                await window.pe.setPerson({ email: email });
            } else {
                // Registration validation
                switch (true) {
                    case !userName:
                        window.alert("Enter username");
                        return;
                    case !gender:
                        window.alert("Select gender");
                        return;
                    case !age:
                        window.alert("Enter age");
                        return;
                    case !country:
                        window.alert("Enter country");
                        return;
                    case !city:
                        window.alert("Enter city");
                        return;
                    case !address:
                        window.alert("Enter address");
                        return;
                    case !email:
                        window.alert("Enter email");
                        return;
                    case !password:
                        window.alert("Enter password");
                        return;
                    case !confirmPassword:
                        window.alert("Enter confirm password");
                        return;
                    case password !== confirmPassword:
                        window.alert("Passwords and confirm password do not match");
                        return;
                    case !phoneNumber:
                        window.alert("Enter phone number");
                        return;
                    default:
                        // All required fields are present, proceed with registration
                        data = await registration(email, phoneNumber, password, userName, age, gender, city, address, country);
                        createPersonData = await createPerson(email, phoneNumber, userName, gender, country, city, address, age);
                        await window.pe.track("registrationretail");
                        break;
                }
            }

            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e);
        }
    };


    return (
        <div className='auth-page'>
            <div className='auth-page__content'>
                <h2 className='auth-page__title'>{isLogin ? "Authorization" : "Registration"}</h2>
                {isLogin ?
                    <Authorisation
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    /> :
                    <Registration
                        userName={userName}
                        setUserName={setUserName}
                        country={country}
                        setCountry={setCountry}
                        address={address}
                        setAddress={setAddress}
                        email={email}
                        setEmail={setEmail}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        phone={phone}
                        setPhone={setPhone}
                        optIn={optIn}
                        setOptIn={setOptIn}
                        age={age}
                        setAge={setAge}
                        city={city}
                        setCity={setCity}
                        gender={gender}
                        setGender={setGender}
                    />
                }

                {
                    isLogin ?
                        <div className='auth-page_button-section'>
                            <button className='button-section_button' onClick={click}>LOG IN</button>
                            <div className='button-section_description'>
                                <div>Don't have an account yet?</div>
                                <NavLink className='button-section_description-link' to={REGISTRATION_ROUTE}>Sign up here.</NavLink>
                            </div>

                        </div>
                        :
                        <div className='auth-page_button-section'>
                            <button className='button-section_button' onClick={click}>Registration</button>
                            <div className='button-section_description'>
                                <div>Have an account?</div>
                                <NavLink className='button-section_description-link' to={LOGIN_ROUTE}>Sign up here.</NavLink>
                            </div>

                        </div>
                }
            </div>
        </div>
    );
});

export default Auth; 