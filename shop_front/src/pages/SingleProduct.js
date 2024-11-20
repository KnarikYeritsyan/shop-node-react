import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createProductRating, getOneProduct} from "../store/actions/products";
import {useLocation, useParams, useNavigate} from "react-router-dom";


import _ from "lodash"
import Wrapper from "../components/Wrapper";
import Rating from "../components/Ratings";
import {addToCartRequest} from "../store/actions/cart";
import AddCartBtn from "../components/AddCartBtn";
import WrapperLogOut from "../components/WrapperLogOut";
import HeartButton from "../components/HeartButton";


function SingleProduct(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const product = useSelector(store => store.products.product);
    const products = useSelector(store => store.products.products);
    const token = useSelector(store => store.users.token);

    useEffect(() => {
        dispatch(getOneProduct(params.id))

    }, [params.id]);


    const addToCart = useCallback(() => {
        if (!token) {
            navigate('/login')
            return
        }
        dispatch(addToCartRequest(product.id))
    }, [product.id]);


    return (

        <div>
            {token
                ?
                <Wrapper>

                    {!_.isEmpty(product) ?
                        <div className='single__container'>
                            {/*{product.item_products[0].img}*/}
                            <div className='images__block'>
                                <div className='single__image'>
                                    <img src={`http://localhost:4000/${product.img}`}/>
                                </div>
                                <div className='images'>
                                    {products?.map(p => (
                                            <div
                                                className='images__item'
                                                key={p.id}
                                                onClick={() => navigate(`/product/${p.id}`)}>
                                                <img src={`http://localhost:4000/${p.img}`} alt="" />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className='product__details'>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div>
                                        <h2>{product.product_item.product_brand.name.toUpperCase()}  {product.product_item.name.toUpperCase()} ({product.color})</h2>
                                    </div>
                                    <HeartButton product={product}/>
                                </div>



                                <Rating product={product.product_item} />
                                <hr/>
                                <p className='price'>${product.product_item.price}</p>
                                <div className='desc'>
                                    <h4>Description</h4>
                                    <p>{product.product_item.description}</p>
                                </div>

                                <hr style={{marginBottom: '20px'}}/>

                                <AddCartBtn onClick={addToCart}/>
                            </div>
                        </div>:
                        <div className='empty__block'>
                            <h2 style={{color: '#6b758c'}}>Single product is empty</h2>

                        </div>
                    }
                </Wrapper>
                :
                <WrapperLogOut>

                    {!_.isEmpty(product) ?
                        <div className='single__container'>
                            {/*{product.item_products[0].img}*/}
                            <div className='images__block'>
                                <div className='single__image'>
                                    <img src={`http://localhost:4000/${product.img}`}/>
                                </div>
                                <div className='images'>
                                    {products?.map(p => (
                                            <div
                                                className='images__item'
                                                key={p.id}
                                                onClick={() => navigate(`/product/${p.id}`)}>
                                                <img src={`http://localhost:4000/${p.img}`} alt="" />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className='product__details'>

                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div>
                                        <h2>{product.product_item.product_brand.name.toUpperCase()}  {product.product_item.name.toUpperCase()} ({product.color})</h2>
                                    </div>
                                    <HeartButton product={product}/>
                                </div>

                                <Rating product={product.product_item} />
                                <hr />
                                <p className='price'>{product.product_item.price} դր․</p>
                                <div className='desc'>
                                    <h4>Description</h4>
                                    <p>{product.product_item.description}</p>
                                </div>

                                <hr  style={{marginBottom: '20px'}}/>

                                <AddCartBtn onClick={addToCart}/>
                            </div>
                        </div>:
                        <div className='empty__block'>
                            <h2 style={{color: '#6b758c'}}>Single product is empty</h2>

                        </div>
                    }
                </WrapperLogOut>
            }
        </div>


    )
}

export default SingleProduct;