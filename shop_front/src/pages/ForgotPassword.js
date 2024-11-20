import React, { useCallback, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordRequest} from "../store/actions/users";
import {useLocation, useNavigate} from "react-router-dom";
import WrapperLogOut from "../components/WrapperLogOut";
import Input from "../components/Input";

function ForgotPassword(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const status = useSelector(store => store.users.forgotPasswordRequestStatus);



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     dispatch(forgotPasswordRequest(email, (err, data) => {
    //         if (err) {
    //             setMessage(err.errors.user);
    //             console.log(err.errors.user)
    //             return
    //         }
    //         // console.log(data)
    //         navigate(`/recover/code?email=${data.user.email}`);
    //     }))
    //
    //
    // };


    const handleSubmit = useCallback ((e) => {
        e.preventDefault();

        dispatch(forgotPasswordRequest(email, (err, data) => {
            if (err) {
                setMessage(err.errors.user);
                console.log(err.errors.user)
                return
            }
            // console.log(data)
            navigate(`/recover/code?email=${data.user.email}`);
        }))

    }, [email]);

    return (

        <WrapperLogOut>

            <div className='recover'>
                <div className='recover__block'>
                    <h2>Reset Your password</h2>


                    {status === 'fail'
                        ?
                        <div className='error__block'>
                            <h4>Nothing found</h4>
                            <p>User was not found with the data you sent, please try again with different data.</p>
                        </div>

                        :
                        null
                    }

                    <h4>
                        You will receive a 6-digit code to your email address.
                    </h4>
                    <p>Please enter your email to search for your account.</p>


                    <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                        />

                        <div
                            style={{display: "flex", justifyContent: "flex-end"}}
                            className='btn'>
                            <button type="submit">Continue</button>
                        </div>

                    </form>

                    {/*{status === 'fail'*/}
                    {/*    ?*/}
                    {/*    <p>User not found</p>*/}
                    {/*    :*/}
                    {/*    null*/}
                    {/*}*/}

                </div>
            </div>

        </WrapperLogOut>

    );
}

export default ForgotPassword;