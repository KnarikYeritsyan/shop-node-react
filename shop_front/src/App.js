import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ActivationEmail from "./pages/ActivationEmail";
import {ToastContainer} from 'react-toastify'
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmCode from "./pages/ConfirmCode";
import Favorites from "./pages/Favorites";
import PaymentMethod from "./pages/PaymentMethod";
import Order from "./pages/Order";

function App(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/shop" />}/>
                    {/*<Route path="/*" element={<Navigate to="/404" />}/>*/}
                    <Route path="/register" element={<Register/>}/>                    {/*+*/}
                    <Route path="/login" element={<Login/>}/>                          {/*+*/}
                    <Route path="/recover" element={<ForgotPassword/>}/>               {/*+*/}
                    <Route path="/recover/password" element={<ResetPassword/>}/>       {/*+*/}
                    <Route path="/recover/code" element={<ConfirmCode/>}/>             {/*+*/}

                    <Route path="/shop" element={<Home/>} />                           {/*--------*/}
                    <Route path="/profile" element={<Profile/>} />                     {/*+*/}
                    <Route path="/product/:id" element={<SingleProduct />} />          {/*+*/}
                    <Route path="/cart" element={<Cart />} />                          {/*+*/}

                    <Route path="/favorites" element={<Favorites />} />                {/*--------*/}
                    <Route path="/order/:id" element={<PaymentMethod />} />            {/*+*/}
                    <Route path="/orders" element={<Order />} />                       {/*+*/}

                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/activation/email" element={<ActivationEmail />} />
                    <Route path="/404" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;