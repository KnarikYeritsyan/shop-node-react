import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteFromCartRequest, getCartRequest} from "../store/actions/cart";
import QuantityPicker from "../components/QuantityPicker";
import Wrapper from "../components/Wrapper";
import _ from 'lodash';
import ModalAddress from "../components/ModalAddress";
import Loading from "../components/Loading";

function ShoppingCartPage() {
    const dispatch = useDispatch();

    const cartList = useSelector(store => store.cart.cartList);
    const status = useSelector(store => store.cart.getCartRequestStatus);
    const cart = useSelector(store => store.cart.cart);
    const [quantity, setQuantity] = useState();
    const [modal, setModal] = useState(false);


    console.log(cartList)
    useEffect(() => {
        dispatch(getCartRequest())
    }, [])

    const handleCount = useCallback((c) => {
        setQuantity(c);
    }, [quantity]);

    const handleDelete = useCallback((id) => {
        dispatch(deleteFromCartRequest(id));
    }, []);


    // const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Wrapper>

            {status === 'request'
                ?
                <Loading/>
                // <div><h1>Loading</h1></div>
                : null
            }



            {status === 'ok' && _.isEmpty(cartList)
                ?

                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>Your Shopping Cart is empty</h2>

                </div>:
                <div className='cart_container'>
                    <div className='cart__block'>
                        <h2>Cart</h2>

                        <>
                            {cartList.map(cart => (
                                <div className='cart_item__block' key={cart.cartProduct.id}>




                                    <div className='cart_item'>
                                        <div>
                                            <img src={`http://localhost:4000/${cart.cartProduct.img}`} alt=""/>
                                        </div>

                                        <div>
                                            <p>
                                                {cart.cartProduct.product_item.product_brand.name }  { cart.cartProduct.product_item.name}
                                            </p>
                                            <p>({cart.cartProduct.color})</p>
                                            <p> ${cart.cartProduct.product_item.price}</p>
                                        </div>
                                    </div>

                                    <div className='cart_item'>
                                        <QuantityPicker
                                            productId={cart.cartProduct.id}
                                            productItemQty={cart.quantity}
                                            handleQty={handleCount}
                                            qty={cart.cartProduct.quantity}
                                        />
                                    </div>

                                    <div className='cart_item'>
                                        {/*<p>{cart.subTotalPrice}</p>*/}
                                        <button
                                            className='cart_item_delete'
                                            onClick={() => handleDelete(cart.cartProduct.id)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>

                    </div>
                    <div className= 'buy__block'>
                        <div className='price_block'>
                            <h4>Total price</h4>
                            <p>${cart.totalPrice}</p>
                        </div>


                        <button onClick={() => setModal(true)}>
                            Buy now
                        </button>
                    </div>

                    <ModalAddress
                        open={modal}
                        onClose={() => setModal(false)}
                    />
                </div>
            }

        </Wrapper>

    );
}

export default ShoppingCartPage;