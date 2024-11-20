import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsersRequest} from "../store/actions/users";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import EmailModal from "../components/EmailModal";


function Users(props) {
    const dispatch = useDispatch();
    const users = useSelector(store => store.users.users);
    const [modal, setModal] = useState({open: false, user: {}})


    useEffect(() => {
        dispatch(getUsersRequest())
    }, [])

    const handleDelete = useCallback((id) => {
        dispatch(deleteUser(id))
    }, [])

    console.log(users)


    return (
        <Wrapper>
            <div className='container'>

                <EmailModal
                    open={modal.open}
                    user={modal.user}
                    onClose={() => setModal({open: false, product: {}})}

                />

                <div className='category__block'>
                    {users?.map(user => (
                        <div key={user.id} className='category__item__block'>
                            <div className='category__item'>
                                <p>{user.firstName} {user.lastName}</p>
                            </div>

                            <div className='category__item'>
                                <p
                                    // style={{cursor: "pointer"}}
                                    // onClick={() => setModal({open: true, user})}
                                >
                                    {user.email}
                                </p>
                            </div>

                            {/*<button*/}
                            {/*    onClick={() => handleDelete(user.id)}*/}
                            {/*>*/}
                            {/*    Delete*/}
                            {/*</button>*/}


                            <i className="focus-input100 fa fa-solid fa-envelope"
                               style={{color: '#6b758c', cursor: 'pointer'}}
                               onClick={() => setModal({open: true, user})}
                            />

                        </div>

                    ))}
                </div>
            </div>
        </Wrapper>

    );
}

export default Users;