import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {deleteProductItem, getProductItem} from "../store/actions/productItem";
import {deleteCategory} from "../store/actions/categories";
import ItemModal from "../components/ItemModal";
import ModalProductItem from "../components/ModalProductItem";
import Wrapper from "../components/Wrapper";

function ProductItem(props) {
    const dispatch = useDispatch();

    const params = useParams();
    const productItems = useSelector(store => store.productItem.productItems);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({open: false, product: {}});

    useEffect(() => {
        dispatch(getProductItem(params.id))

    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(deleteProductItem(id, params.id));
    }, [])

    // console.log(productItems)
    // console.log(productsList)
    console.log(productItems);
    return (
        <Wrapper>
            <div className='container'>

                <button onClick={() => setModal(true)}>
                    Create
                </button>

                <ModalProductItem
                    open={updateModal.open}
                    update={true}
                    product={updateModal.product}
                    onClose={() => setUpdateModal({open: false, product: {}})}
                />

                <ModalProductItem
                    open={modal}
                    onClose={() => setModal(false)}
                />


                <div className='product__block'>
                    {productItems.map(product => (

                        <div className='product_item__block' key={product.id}>

                            <div className='product_item'>
                                <img src={`http://localhost:4000/${product.img}`} alt=""/>
                            </div>

                            <div className='product_item'>
                                <p>
                                    {product.color}
                                </p>
                            </div>
                            <div className='product_item'>
                                <p>
                                    {product.quantity}
                                </p>
                            </div>

                            <button
                                className='product_item'
                                onClick={() => setUpdateModal({open: true, product})}>
                                Edit
                            </button>
                            <button
                                className='product_item'
                                onClick={() => handleDelete(product.id)}>Delete
                            </button>
                        </div>

                    ))}
                </div>


            </div>
        </Wrapper>

    );
}

export default ProductItem;