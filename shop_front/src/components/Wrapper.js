import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import {getOneProduct} from "../store/actions/products";
import Footer from "./Footer";

function Wrapper(props) {
    const token = useSelector(store => store.users.token);

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return (
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    );
}

export default Wrapper;
