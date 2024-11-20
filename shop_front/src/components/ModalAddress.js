import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import Input from "../components/Input";
import {useDispatch, useSelector} from "react-redux";
import {createOrder, saveShippingAddress} from "../store/actions/order";
import cartItem from "./CartItem";
import {getCartRequest} from "../store/actions/cart";


import axios from "axios";
import {useNavigate} from "react-router-dom";


function ModalAddress({open, onClose}) {
    const dispatch = useDispatch();

    const shippingAddress = useSelector(store => store.order.shippingAddress);
    const order = useSelector(store => store.order.order);
    const cartList = useSelector(store => store.cart.cartList);
    const cart = useSelector(store => store.cart.cart);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        paymentMethod: 'cash',
        country: '',
        city: '',
        address: '',
        postalCode: '',
    });

    useEffect(() => {
        console.log('useEffect')
        dispatch(getCartRequest())
    }, [open])

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData]);


    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        // console.log(formData)
        // console.log(cart)
        // console.log(cartList)
        dispatch(createOrder(formData, cart, cartList , (err, data) => {
            if (err) {
                setErrors(err.errors);
                // return
            }
            console.log('onClose')
            console.log("formData.paymentMethod", formData.paymentMethod)
            if (formData.paymentMethod === 'paypal') {
                // console.log('data', data)
                // console.log("order", order)
                navigate(`/order/${data.order.id}`)
                // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            }

            onClose();

            // navigate('/login');
        }));
    }, [formData]);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await axios.post("http://localhost:4000/orders/payment", {
    //             amount: formData.country,
    //         });
    //
    //         console.log('response',response.data.url)
    //
    //         window.location.href = response.data.url;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // console.log(shippingAddress)
    console.log(formData)
    console.log(cart)
    console.log(cartList)
    return (
        <Modal
            isOpen={open}
            bodyOpenClassName="body__modal"
            overlayClassName="testOverlay"
            className="testContent"
            onRequestClose={onClose}
        >

            <div className='close_btn_block'>
                <button onClick={onClose}>X</button>
            </div>



            <div className='modal__container'>
                <form onSubmit={handleSubmit}>

                    <Input
                        value={formData.country}
                        onChange={handleChange('country')}
                        placeholder="country"
                        type='text'
                        error={errors.country}
                        required
                    />
                    <Input
                        value={formData.city}
                        onChange={handleChange('city')}
                        error={errors.city}
                        type='text'
                        placeholder="city"
                        required
                    />
                    <Input
                        value={formData.address}
                        onChange={handleChange('address')}
                        error={errors.address}
                        type='text'
                        placeholder="address"
                        required
                    />
                    <Input
                        value={formData.postalCode}
                        onChange={handleChange('postalCode')}
                        error={errors.postalCode}
                        type='text'
                        placeholder="postalCode"
                        required
                    />

                    <div className='label'>
                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={formData.paymentMethod === 'cash'}
                                onChange={handleChange('paymentMethod')}
                            />
                            Pay with cash
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="paypal"
                                checked={formData.paymentMethod === 'paypal'}
                                onChange={handleChange('paymentMethod')}
                            />
                            Pay with card
                        </label>
                    </div>



                    <div className='btn'>
                        <button>
                            To order
                        </button>
                    </div>

                </form>
            </div>




            {/*<div className='modal__container'>*/}
            {/*    <form onSubmit={handleSubmit}>*/}

            {/*        <Input*/}
            {/*            value={formData.country}*/}
            {/*            onChange={handleChange('country')}*/}
            {/*            placeholder="country"*/}
            {/*            error={errors.country}*/}
            {/*            required*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*            value={formData.city}*/}
            {/*            onChange={handleChange('city')}*/}
            {/*            error={errors.city}*/}
            {/*            placeholder="city"*/}
            {/*            required*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*            value={formData.address}*/}
            {/*            onChange={handleChange('address')}*/}
            {/*            error={errors.address}*/}
            {/*            placeholder="address"*/}
            {/*            required*/}
            {/*        />*/}
            {/*        <Input*/}
            {/*            value={formData.postalCode}*/}
            {/*            onChange={handleChange('postalCode')}*/}
            {/*            error={errors.postalCode}*/}
            {/*            placeholder="postalCode"*/}
            {/*            required*/}
            {/*        />*/}

            {/*        <div className='btn'>*/}
            {/*            <button>*/}
            {/*                To order*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*    </form>*/}
            {/*</div>*/}

        </Modal>
    );
}

export default ModalAddress;