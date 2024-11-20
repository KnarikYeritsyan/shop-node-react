import React, {useCallback, useEffect} from 'react';
import {getOrderItems} from "../store/actions/order";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Wrapper from "../components/Wrapper";
import _ from "lodash";

function PaymentMethod(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const orderItems = useSelector(store => store.order.orderItems);
    const status = useSelector(store => store.order.getOrderItemsRequestStatus);

    useEffect(() => {
        if (params.id) {
            dispatch(getOrderItems(params.id));
        }
    }, [params.id]);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await axios.post("http://localhost:4000/orders/payment", {
    //             amount: orderItems.totalPrice, id: orderItems.id
    //         });
    //
    //         console.log('response',response.data.url)
    //
    //         window.location.href = response.data.url;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/orders/payment", {
                amount: orderItems.totalPrice, id: orderItems.id
            });

            console.log('response',response.data.url)

            window.location.href = response.data.url;
        } catch (error) {
            console.log('errrrrrrrrrrrrrrror',error);
        }
    }, [orderItems]);


    console.log(_.isEmpty(orderItems), status, !_.isEmpty(orderItems))

    return (

        <Wrapper>
            {status === 'ok' && !_.isEmpty(orderItems)
                ?
                <div className='payment__block'>
                    <h3>Price ${orderItems.totalPrice}</h3>

                    <button onClick={handleSubmit}>
                        <span style={{color: '#003087', fontWeight: '900'}}>Pay</span>
                        <span style={{color: '#009cde', fontWeight: '900'}}>Pal</span>
                    </button>

                </div>
                :
                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>Order not found</h2>
                </div>
            }

        </Wrapper>

    );
}

export default PaymentMethod;