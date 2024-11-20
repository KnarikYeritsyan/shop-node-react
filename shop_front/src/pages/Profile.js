import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoRequest} from "../store/actions/users";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {getUserOrders} from "../store/actions/order";
import qs from "query-string";
import ProfileInfo from "../components/ProfileInfo";



import {registrationRequest, updateUserInfoRequest} from "../store/actions/users";
import Input from "../components/Input";
import {toast} from "react-toastify";



// function Profile(props) {
//     const dispatch = useDispatch();
//     const user = useSelector(store => store.users.profile);
//     const orders = useSelector(store => store.order.orders);
//     const [profile, setProfile] = useState(true);
//     const [order, setOrder] = useState(false);
//
//     const navigate = useNavigate();
//     const location = useLocation();
//     const query = qs.parse(location.search);
//
//
//     // useEffect( () => {
//     //     if (query.paymentId !== undefined && query.PayerID !== undefined) {
//     //         (async () => {
//     //
//     //             try {
//     //                 const response = await axios.get("http://localhost:4000/orders/execute", {
//     //                     params: { query }
//     //                 });
//     //                 console.log('response',response.data.url)
//     //                 window.location.href = response.data.url;
//     //             } catch (error) {
//     //                 console.log(error);
//     //             }
//     //
//     //     })();
//     //     }
//     // }, [query]);
//
//
//     useEffect(() => {
//         dispatch(getUserInfoRequest())
//         dispatch(getUserOrders())
//     }, []);
//
//     console.log(user)
//     console.log(orders)
//     return (
//         <Wrapper>
//             <div className='profile__container'>
//                 <div className='user__info'>
//
//                     <div className='icon__block'>
//                         <i className="fas fa-user"></i>
//                     </div>
//
//                     <div className= 'info__block'>
//                         <h4>{user.firstName} {user.lastName}</h4>
//                         <h4>{user.email}</h4>
//                         <p>Joined {moment(user.createdAt).format('ll')}</p>
//
//
//                     </div>
//
//                     <div>
//                         <ul>
//                             <li className="nav__list"
//                                 onClick={() => {
//                                     setProfile(true)
//                                     setOrder(false)
//                                 }}
//                             >
//                                 Personal Info
//                             </li>
//                             <li className="nav__list"
//                                 onClick={() => {
//                                     setProfile(false)
//                                     setOrder(true)
//                                 }}
//                             >
//                                 Orders
//                             </li>
//                         </ul>
//                     </div>
//
//
//
//                 </div>
//
//
//                 {profile
//                     ?
//                     <ProfileSettings user = {user}/>
//                     : null
//                 }
//
//                 {order
//                     ?
//                     <Orders/>
//                     : null
//                 }
//
//
//
//             </div>
//
//         </Wrapper>
//     );
// }



function Profile(props) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.profile);


    useEffect(() => {
        dispatch(getUserInfoRequest())
        // dispatch(getUserOrders())
    }, []);



    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirm: '',
        oldPassword: '',
    });


    useEffect(() => {
        console.log('useEffect')
        setFormData({...formData, firstName: user.firstName, lastName: user.lastName, });
    }, [dispatch,user])

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData]);


    const handleSubmit = useCallback(async (ev) => {
        console.log('handleSubmit')
        ev.preventDefault();
        if (formData.password !== formData.confirm) {
            toast.error(`password and confirm no equal`, {
                style: {top: 55, right: 0},
                autoClose: 1500,
            })
        } else {
            dispatch(updateUserInfoRequest(formData,  (err, data) => {
                if (err) setErrors(err.errors);
            }));
            setFormData(
                {
                    password: '',
                    confirm: '',
                    oldPassword: '',
                }
            )

        }

    }, [formData]);


    return (
        <Wrapper>
            <div className='profile__container'>
                <ProfileInfo/>


                <div className='profile__block'>
                    <form onSubmit={handleSubmit}>

                        <Input
                            value={formData.firstName}
                            onChange={handleChange('firstName')}
                            placeholder="First Name"
                            // error={errors.firstName}
                            className='profile__input'
                        />

                        <Input
                            value={formData.lastName}
                            onChange={handleChange('lastName')}
                            // error={errors.lastName}
                            placeholder="Last Name"
                            className='profile__input'
                        />
                        <Input
                            value={formData.oldPassword}
                            onChange={handleChange('oldPassword')}
                            // error={errors.oldPassword}
                            placeholder="old password"
                            className='profile__input'
                        />
                        <Input
                            value={formData.password}
                            onChange={handleChange('password')}
                            // error={errors.password}
                            placeholder="Password"
                            className='profile__input'
                        />

                        <Input
                            value={formData.confirm}
                            onChange={handleChange('confirm')}
                            // error={errors.confirm}
                            placeholder="confirm password"
                            className='profile__input'
                        />

                        <button>
                            Update Profile
                        </button>

                    </form>
                </div>


            </div>

        </Wrapper>
    );
}

export default Profile;