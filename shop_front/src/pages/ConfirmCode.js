import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {confirmCodeRequest, recoverPasswordRequest} from "../store/actions/users";
import qs from 'query-string';
import {useLocation, useNavigate} from "react-router-dom";
import Utils from "../helpers/Utils";
import WrapperLogOut from "../components/WrapperLogOut";
import Input from "../components/Input";

function ConfirmCode(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);
    const status = useSelector(store => store.users.confirmCodeRequestStatus);

    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     dispatch(confirmCodeRequest(query, (err, data) => {
    //         if (err) {
    //             setMessage(err.errors.code);
    //             console.log(err.errors)
    //             return
    //         }
    //         console.log(data)
    //         navigate(`/recover/password?email=${data.user.email}&code=${data.user.activationCode}`);
    //     }))
    //
    //
    // };

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();
        dispatch(confirmCodeRequest(query, (err, data) => {
            if (err) {
                setMessage(err.errors.code);
                console.log(err.errors)
                return
            }
            console.log(data)
            navigate(`/recover/password?email=${data.user.email}&code=${data.user.activationCode}`);
        }))


    }, [code, query]);

    return (
        <WrapperLogOut>
            <div className='recover'>
                <div className='recover__block'>
                    <h2>Enter the security code</h2>

                    {status === 'fail'
                        ?
                        <div className='error__block'>
                            <p>The number you entered does not match your code. Please try again.</p>
                        </div>

                        :
                        null
                    }
                    <p>
                        Check your email for a message with your password.
                        Your code consists of 6 digits.
                    </p>
                    <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>

                        <Input
                            value={code}
                            onChange={(e) => {
                                query.code = e.target.value
                                navigate(`?${Utils.queryStrfy({...query})}`)
                                setCode(e.target.value)
                            }}
                            placeholder="Enter the code"
                            name="code"
                            pattern=".{6,}"
                            type='text'
                            required
                        />

                        <div className='btn'>
                            <button type="submit">Continue</button>
                        </div>

                    </form>
                    {/*<p>{message}</p>*/}
                </div>
            </div>

        </WrapperLogOut>


    );
}

export default ConfirmCode;