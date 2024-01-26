import React, { useContext, useEffect } from 'react';
import { Context } from '../../index';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, ACCOUNT_ROUTE } from '../../utils/const';
import { observer } from "mobx-react-lite"
import "./NavBar.css"
import logo from "../../assets/logo.png"
import logout from "../../assets/logout.png"
import login from "../../assets/login.png"
import basket from "../../assets/basket.png"
import admin from "../../assets/admin.png"
import { UserIcon } from "../../utils/elements"

const NavBar = observer(() => {
    
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    return (
            
            <div className='navbar container'>

                <NavLink className="link logo" to={SHOP_ROUTE}>
                    <img width={50} height={50} src={logo} />
                </NavLink>
                {user.user.role === "ADMIN" && user.isAuth === true &&
                    <div className="header__menu">
                        <div className="icon header__user" onClick={() => navigate(ACCOUNT_ROUTE)}><UserIcon/></div>
                        
                        <div className="icon header__admin" onClick={() => navigate(ADMIN_ROUTE)}><img src={admin}></img></div>
                        <div className="icon header__basket" onClick={() => {
                            navigate(BASKET_ROUTE)
                        }}><img src={basket}></img></div>
                        <div className="icon header__logout" onClick={() => logOut()}><img src={logout}></img></div>
                    </div>}

                {user.user.role === "USER" && user.isAuth === true &&
                    <div className="d-flex" style={{ color: "white" }}>
                        <div className="icon header__basket" onClick={() => {
                            navigate(BASKET_ROUTE)
                        }}><img src={basket}></img></div>
                        <div className="icon header__logout" onClick={() => logOut()}><img src={logout}></img></div>
                    </div>}
                {user.isAuth === false &&
                    <div>
                        <div className="icon header__login" onClick={() => {
                            navigate(LOGIN_ROUTE)
                        }}><img src={login}></img></div>
                    </div>
                }

            </div>
       
    );
});

export default NavBar;