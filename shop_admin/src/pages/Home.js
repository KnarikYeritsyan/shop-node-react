import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

// import './App.css';
import {getBrands} from "../store/actions/brands";
import {getCategories} from "../store/actions/categories";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import qs from 'query-string'
import Wrapper from "../components/Wrapper";


function Home(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const brands = useSelector(store => store.brands.brands);
    const categories = useSelector(store => store.categories.categories);
    const location = useLocation();
    const query = qs.parse(location.search)

    useEffect(() => {

    }, []);

    return (
        <Wrapper className="App">
            {/*<div className="">*/}
            {/*    <ul className="nav">*/}
            {/*        <li className="nav-item"><NavLink className = 'color' to='/product'>Product</NavLink></li>*/}
            {/*        <li className="nav-item"><NavLink className = 'color' to='/category'>Category</NavLink></li>*/}
            {/*        <li className="nav-item"><NavLink className = 'color' to='/brand'>Brand</NavLink></li>*/}
            {/*    </ul>*/}

            {/*</div>*/}


        </Wrapper>
    );
}

export default Home;
