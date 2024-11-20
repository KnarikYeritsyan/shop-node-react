import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    confirmCodeRequest,
    recoverPasswordRequest
} from "../store/actions/users";
import {useLocation, useNavigate} from "react-router-dom";
import qs from 'query-string';
import WrapperLogOut from "../components/WrapperLogOut";
import Input from "../components/Input";
import Utils from "../helpers/Utils";
import {toast} from "react-toastify";

function ResetPassword(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const status = useSelector(store => store.users.confirmCodeRequestStatus);
    const recoverStatus = useSelector(store => store.users.recoverPasswordRequestStatus);
    const query = qs.parse(location.search);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(confirmCodeRequest(query))

    }, []);

    console.log('recoverStatus', recoverStatus)

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     dispatch(recoverPasswordRequest(password, query, (err, data) => {
    //         if (err) {
    //             // setMessage(err.errors.code);
    //             console.log(err.errors)
    //             return
    //         }
    //         console.log(data)
    //         // navigate(`/login`);
    //     }))
    //
    // };

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();

        dispatch(recoverPasswordRequest(password, query, (err, data) => {
            if (err) {
                // setMessage(err.errors.code);
                console.log(err.errors)
                // return
                toast.success('Data does not match, please refresh the page', {
                    position: "top-right",
                    autoClose: 3000,
                })
            } else {
                toast.success('Your password has been changed', {
                    position: "top-right",
                    autoClose: 3000,
                })
            }
            console.log(data)

            // navigate(`/login`);
        }))

    }, [password, query]);

    console.log(query)

    return (

        <WrapperLogOut>
            <div className='recover'>
                <div  className='recover__block'>
                    {status === 'request' ?
                        <div style={{textAlign: 'center'}}>
                            <h1 style={{margin: '50px 0'}}>
                                Loading
                            </h1>
                        </div>
                        :
                        null
                    }


                    {status === 'ok' ?
                        <>
                            <h2>Choose a new password</h2>
                            <p>
                                Create a new password with at least 6 characters.
                                A strong password is a combination of latters, numbers, and punctuation.
                            </p>
                            <form onSubmit={handleSubmit}>

                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter the code"
                                    name="code"
                                    pattern=".{6,}"
                                    type='password'
                                    required
                                />

                                <div className='btn'>
                                    <button type="submit">Continue</button>
                                </div>

                            </form>
                        </>
                        :
                        null
                    }

                    {status === 'fail' ?
                        navigate(`/`)
                        :
                        null
                    }

                </div>
            </div>


        </WrapperLogOut>



        // <div>ResetPassword</div>
    );
}

export default ResetPassword;