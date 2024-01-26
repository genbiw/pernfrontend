import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/const';
import { login, registration } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import {SHOP_ROUTE} from "../../utils/const"
import "./Auth.css"
 
const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 
    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message) 
        }

    }

    return (
        <div className='auth-page'>
            <div className='auth-page__content'>
                <h2 className='auth-page__title'>{isLogin ? "Authorization" : "Registration"}</h2>
                <form className='auth-page__form'>
                    <input className='form__input' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='form__input' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} type='password' />
                </form>
                {
                    isLogin ?
                        <div className='d-flex flex-column'>
                            <button className='auth-button' onClick={click}>LOG IN</button>
                            <NavLink className='align-self-center mt-3' to={REGISTRATION_ROUTE}>Don't have an account yet? Sign up here.</NavLink>
                        </div>
                        :
                        <div className='d-flex flex-column'>
                            <button className='auth-button' onClick={click}>Registration</button>
                            <NavLink className='align-self-center mt-3' to={LOGIN_ROUTE}>Have an account? Sign up here.</NavLink>
                        </div>
                }
            </div>
        </div>
    );
});

export default Auth;