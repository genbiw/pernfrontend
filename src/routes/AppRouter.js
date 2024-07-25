import React, { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import { authAdminRoutes, authRoutes, publicRoutes } from "./routes"
import { SHOP_ROUTE } from '../utils/const';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { user } = useContext(Context)

    return (
        <div>
            <Routes>
                {/* Admin Routes:*/}
                {user.user.role === "ADMIN" &&
                    authAdminRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={Component} />
                    ))
                }

                {/* Auth Routes:*/}
                {user.isAuth && 
                    authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={Component} />
                    ))
                }

                {/* Public Routes */}
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} />
                ))}

                {/* Default Route */}
                <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
            </Routes>
        </div>
    );
});

export default AppRouter;