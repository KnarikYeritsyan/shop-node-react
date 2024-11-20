import React, {useState, useCallback} from 'react';
import InputSearch from "./InputSearch";
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Account from "../helpers/Account";
import {userLogOut} from "../store/actions/users";

function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.users.profile);
    const token = useSelector(store => store.users.token);
    const [show, setShow] = useState(false)
    console.log(user)

    const handleLogOut = useCallback(() => {
        Account.removeToken();
        dispatch(userLogOut())
    }, [token]);

    return (
        <div>
            <div className='header'>
                <div className='header__container'>
                    <div
                        onClick={() => navigate(`/`)}
                        className='logo'>
                        LOGO
                    </div>
                   <div>
                       <h2>Admin Page</h2>
                   </div>
                    <ul className='ul'>

                        {!token
                            ?
                            <>
                                <li onClick={() => navigate(`/login`)}>
                                    LOGIN
                                </li>
                            </>
                           :
                            <div onMouseOver={() => setShow(true)}
                                onMouseLeave={() => setShow(false)}>
                                {/*<li>Hi,{(user.firstName)?.substring(0, 5)} </li>*/}
                                <li><i className="fas fa-user"></i> </li>
                                {show ?
                                    <ul style={{position: "absolute"}}>
                                        {/*<li style={{marginTop: '4px'}} onClick={() => {*/}
                                        {/*    Account.removeToken();*/}
                                        {/*    navigate(`/` );*/}
                                        {/*    // <Navigate to="/login" replace />*/}
                                        {/*}}>LogOut</li>*/}
                                        <li style={{marginTop: '4px'}} onClick={handleLogOut}>LogOut</li>
                                    </ul>
                                    : null}
                            </div>

                        }

                    </ul>
                </div>
            </div>
            <div style={{marginBottom: '100px'}}></div>

        </div>


    );
}

export default Header;