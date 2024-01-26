import React, { useContext, useEffect } from 'react';
import {Route, Routes, Navigate} from "react-router-dom"
import {authAdminRoutes, authRoutes, publicRoutes} from "./routes"
import { SHOP_ROUTE, LOGIN_ROUTE } from '../utils/const';
import { Context } from '../index';

const AppRouter = () => { 
    const {user} = useContext(Context)

    useEffect(() => {
    }, [user.isAuth, user.user.role]);

    return (
        <div>
            <Routes>

                {/* Admin Routes */}
                {user.user.role === "ADMIN" && user.isAuth ? (
                    authAdminRoutes.map(({path, Component}) => (
                        <Route key={path} path={path} element={Component} />
                    ))
                ) : (
                    authAdminRoutes.map(({path}) => (
                        <Route key={path} path={path} element={<Navigate to={LOGIN_ROUTE} replace />} />
                    ))
                ) 
                }

                {/* Auth Routes */}
                {user.isAuth ? (
                    authRoutes.map(({path, Component}) => (
                        <Route key={path} path={path} element={Component} />
                    ))
                ) : (
                    authRoutes.map(({path}) => (
                        <Route key={path} path={path} element={<Navigate to={LOGIN_ROUTE} replace />} />
                    ))
                )}

                {/* Public Routes */}
                {publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={Component} />
                ))}

                {/* Default Route */}
                <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
            </Routes>
        </div>
    );
};

export default AppRouter;