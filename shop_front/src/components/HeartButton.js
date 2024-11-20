import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {toggleFavorites} from "../store/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";


function HeartButton({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isFavorite, setIsFavorite] = useState(false)
    const token = useSelector(store => store.users.token);


    useLayoutEffect(()=>{
        setIsFavorite(product.favorite)
    },[product])



    const handleToggle = useCallback((productId) => {

        if (!token) {
            navigate('/login')
            return
        }

        setIsFavorite(!isFavorite)
        dispatch(toggleFavorites(productId))

    }, [isFavorite]);

    return (
        <div className='heart__block'>
            <button onClick={() => handleToggle(product.id)}>
                {isFavorite
                    ?
                    <i className="fas fa-heart"/>
                    :
                    <i className="far fa-heart"/>
                }

            </button>
        </div>

    );
}

export default HeartButton;