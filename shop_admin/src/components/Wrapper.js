import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";


function Wrapper(props) {
    const token = useSelector(store => store.users.token);
    console.log(token)
    if (!token) {
        return <Navigate to="/login" replace />
    }

    return (
        <div>
            <Header/>
            <div className='wrapper__container'>
                <Aside/>
                {props.children}
            </div>
            <Footer/>
        </div>

    );
}

export default Wrapper;
