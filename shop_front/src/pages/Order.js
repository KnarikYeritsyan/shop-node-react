import React, {useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoRequest} from "../store/actions/users";
import moment from "moment";
import {getUserOrders} from "../store/actions/order";
import ProfileInfo from "../components/ProfileInfo";
import OrderItemsModal from "../components/OrderItemsModal";
import qs from "query-string";
import axios from "axios";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Pagination from "../components/Pagination";

function Order(props) {
    const dispatch = useDispatch();
    // const user = useSelector(store => store.users.profile);
    const orders = useSelector(store => store.order.orders);
    const total_orders = useSelector(store => store.order.total_orders);

    const location = useLocation();
    const query = qs.parse(location.search);



    useEffect(() => {
        if (query.paymentId !== undefined && query.PayerID !== undefined) {
            (async () => {

                try {
                    const response = await axios.get("http://localhost:4000/orders/execute", {
                        params: {query}
                    });
                    console.log('response', response.data.url)
                    // dispatch(getUserOrders())
                    // window.location.href = response.data.url;
                } catch (error) {
                    console.log(error);
                }

            })();
        }
    }, [location.search]);


    useEffect(() => {
        // dispatch(getUserInfoRequest())
        const query = qs.parse(location.search);
        dispatch(getUserOrders(query))
    }, [location.search]);


    const [modal, setModal] = useState({open: false, id: ''});


    return (
        <Wrapper>
            <div className='profile__container'>
                <ProfileInfo/>

                <div className='order'>
                    <div className='order__block'>

                        <OrderItemsModal
                            open={modal.open}
                            id={modal.id}
                            onClose={() => setModal({open: false, id: ''})}
                        />

                        {orders?.map((order, index) => (
                            <div className='order__item__block' style={{background: order.paymentStatus? '#d1e7dd' : '#f8d7da'}}>
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
                                    {order.paymentStatus? 'paid' : 'not paid'}
                                </div>

                                <div className='order__item'>
                                    {order.totalPrice}$
                                </div>

                                <div className='order__item'>
                                    <button
                                        onClick={() => setModal({open: true, id: order.id})}
                                    >
                                        Details
                                    </button>
                                </div>


                            </div>
                        ))

                        }

                    </div>

                </div>





            </div>

            <div className='pagination__block' style={{marginBottom: '30px'}}>
                <Pagination total={total_orders}/>
            </div>

        </Wrapper>
    );
}

export default Order;