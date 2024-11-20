import React, {useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Rating from "./Ratings";
import AddCartBtn from "./AddCartBtn";
import {addToCartRequest} from "../store/actions/cart";
import HeartButton from "./HeartButton";
import _ from 'lodash';


function ProductItem({product}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(store => store.users.token);

    const addToCart = useCallback((id) => {

        if (!token) {
            navigate('/login')
            return
        }
        dispatch(addToCartRequest(id))
    }, []);

    useEffect(() => {
        // console.log('ProductItem', product)
    }, [])


    return (
        <>
            <div
                className='shop__item'
                // key={_.uniqueId()}
                // key={product.id}
            >

                <HeartButton product={product}/>

                <div
                    className='shop__img__block'
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    <img
                        src={`http://localhost:4000/${product.img}`}
                        className='shop__img'
                        alt='img'
                    />
                </div>


                <h4 className='shop__item__title'>
                     {product.product_item.name}
                </h4>
                <p>({product.product_item.product_brand.name})</p>
                <Rating product={product.product_item}/>

                <p className='shop__item__price'>${product.product_item.price}</p>

                <div style={{textAlign: 'center'}}>
                    <AddCartBtn onClick={addToCart} id={product.id}/>
                </div>



            </div>

        </>
    );
}

export default ProductItem;

// {productsList?.map(p => (
//                     <div
//                         className='shop__item'
//
//                         key={p.item_product.id}
//                     >
//
//                         <div
//                             className='shop__img__block'
//                             onClick={() => navigate(`/product/${p.item_product.id}`)}
//                         >
//                             <img
//                                 src={p.item_product.img}
//                                 className='shop__img'/>
//                         </div>
//
//                         <h4 className='shop__item__title'>{p.product_brand.name} {p.name}</h4>
//                         <Rating product={p} />
//                         <p className='shop__item__price'>${p.price}</p>
//
//                         <AddCartBtn onClick={addToCart} id={p.item_product.id}/>
//
//                         <button onClick={() => handleToggle(p.item_product.id)}>Favorite</button>
//
//                     </div>
//                 )
//
//             )}


