import React, { useCallback, useState } from 'react';
import Input from "../components/Input";
import { loginRequest } from "../store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import WrapperLogOut from "../components/WrapperLogOut"
import {useLocation, useNavigate} from "react-router-dom";
;

function Login(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const token = useSelector(store => store.users.token);

    const [rememberMe, setRememberMe] = useState(true);
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const handleChange = useCallback((key) => (ev) => {
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        dispatch(loginRequest(formData, rememberMe));
    }, [formData, rememberMe]);

    console.log('zzzzzzzzz', token)



    return (
        <WrapperLogOut>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form onSubmit={handleSubmit} className="login100-form validate-form">

                            <span className="login100-form-title p-b-34 p-t-27">
                                Log in
                            </span>

                            <Input
                                value={formData.email}
                                onChange={handleChange('email')}
                                placeholder="Email"
                                name="email"
                                icon="envelope"
                                required
                            />
                            <Input
                                value={formData.password}
                                onChange={handleChange('password')}
                                placeholder="Password"
                                type='password'
                                icon="key"
                                required
                            />
                            <div className="contact100-form-checkbox">
                                <input
                                    className="input-checkbox100"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    id="ckb1" type="checkbox"
                                    name="remember-me" />
                                <label className="label-checkbox100" htmlFor="ckb1">
                                    Remember me
                                </label>
                            </div>


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>

                            </div>

                            <div style={{padding: '30px 0 10px', textAlign: 'center'}}>
                                <button
                                    style={{color: 'wheat'}}
                                    type="button"
                                    onClick={() => navigate(`/recover`)}>
                                    Forgot password?
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </WrapperLogOut>
    );
}

export default Login;
