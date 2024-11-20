import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import {changeOrderStatus, getOrders} from "../store/actions/orders";
import moment from "moment";
import {getProductsList} from "../store/actions/products";
import OrderItemsModal from "../components/OrderItemsModal";
import Pagination from "../components/Pagination";
import {useLocation, useNavigate} from "react-router-dom";

import qs from 'query-string'

function Orders(props) {
    const dispatch = useDispatch();
    const location = useLocation();

    const orders = useSelector(store => store.orders.orders);
    const status = useSelector(store => store.orders.changeOrderRequestStatus)
    const total_orders = useSelector(store => store.orders.total_orders);
    const [modal, setModal] = useState({open: false, id: ''});

    useEffect(() => {
        const query = qs.parse(location.search);
        dispatch(getOrders(query));
    }, [location.search, status]);




    const handleClick = useCallback((id) => {
        dispatch(changeOrderStatus(id));
    }, [])

    console.log(orders);

    return (
        <Wrapper>

            <OrderItemsModal
                open={modal.open}
                id={modal.id}
                onClose={() => setModal({open: false, id: ''})}
            />

            <div className='order__block'>

                    {orders?.map((order, index) => (
                        <div className='order__item__block'>
                            <div className='order__item'>
                                {index + 1}
                            </div>

                            <div className='order__item'>
                                {moment(order.createdAt).format('ll')}
                            </div>

                            <div className='order__item'>
                                {order.status}
                            </div>

                            <div className='order__item'>
                                {order.totalPrice}$
                            </div>

                            <div className='order__item'>
                                <button
                                    className='order__item__btn'
                                    onClick={() => setModal({open: true, id: order.id})}
                                >
                                    Details
                                </button>
                            </div>

                            {order.status === 'pending'
                                ?
                                <div className='order__item'>
                                    <button
                                        className='order__item__btn'
                                        style={{padding: '11px 12px'}}
                                        onClick={() => handleClick(order.id)}
                                    >
                                        Complete The Order
                                    </button>
                                </div>
                                :
                                <div className='order__item'>
                                    <p>
                                        Order Completed
                                    </p>
                                </div>
                            }

                        </div>
                    ))

                    }
                </div>

            <div className='pagination__block'>
                <Pagination total={total_orders}/>
            </div>

        </Wrapper>
    );
}

export default Orders;