import React, { useContext } from 'react';
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

    const navigateToAdminPanel = () => {
        navigate(ADMIN_ROUTE)
    }

    const navigateToBasket = () => {
        navigate(BASKET_ROUTE)
    }

    const navigateToAccount = () => {
        navigate(ACCOUNT_ROUTE)
    }

    const navigateToLogin = () => {
        navigate(LOGIN_ROUTE)
    }

    const logOut = async () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        await window.pe.forgetPerson()
        await window.liveChat('logout', null, function (error, result) {
            if (error) {
                // Handle error during logout
                console.error('Logout error:', error.code, error.message);
            } else {
                // Logout successful, proceed with any further actions if needed
                console.log('Logged out successfully');
            }
        });        
        navigate(SHOP_ROUTE)
    }

    return (

        <div className='navbar container'>

            <NavLink className="link logo" to={SHOP_ROUTE}>
                <img alt='logo-img' width={50} height={50} src={logo} />
            </NavLink>
            {user.user.role === "ADMIN" &&
                <div className="header__menu">
                    <div className="icon header__user" onClick={navigateToAccount}><UserIcon /></div>
                    <div className="icon header__admin" onClick={navigateToAdminPanel}><img alt='admin-img' src={admin}></img></div>
                    <div className="icon header__basket" onClick={navigateToBasket}><img alt='basket-img' src={basket}></img></div>
                    <div className="icon header__logout" onClick={() => logOut()}><img alt='logo-img' src={logout}></img></div>
                </div>}

            {user.user.role === "USER" &&
                <div className="header__menu">
                    <div className="icon header__user" onClick={navigateToAccount}><UserIcon /></div>
                    <div className="icon header__basket" onClick={navigateToBasket}><img alt='basket-img' src={basket}></img></div>
                    <div className="icon header__logout" onClick={() => logOut()}><img alt='logo-img'  src={logout}></img></div>
                </div>}
            {user.isAuth === false &&
                <div className="header__menu">
                    <div className="icon header__basket" onClick={navigateToBasket}><img alt='basket-img' src={basket}></img></div>
                    <div className="icon header__login" onClick={navigateToLogin}><img alt='login-img' src={login}></img></div>
                </div>
            }

        </div>

    );
});

export default NavBar;