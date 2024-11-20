import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import {ToastContainer} from 'react-toastify'
import Product from "./pages/Product";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import ProductItem from "./pages/ProductItem";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

function App(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" />}/>
                    <Route path="/*" element={<Navigate to="/404" />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={<Home/>} />
                    <Route path="/product" element={<Product/>} />
                    <Route path="/category" element={<Category/>} />
                    <Route path="/brand" element={<Brand/>} />
                    <Route path="/user" element={<Users/>} />
                    <Route path="/order" element={<Orders/>} />
                    <Route path="/product/:id" element={<ProductItem />} />
                    <Route path="/404" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;