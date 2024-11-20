import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct, getProductsList} from "../store/actions/products";
import ModalProduct from "../components/ModalProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import {useLocation, useNavigate} from "react-router-dom";
import qs from "query-string";
import Wrapper from "../components/Wrapper";

function Product(props) {

    const navigate = useNavigate();
    // const location = useLocation();
    // const query = qs.parse(location.search);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({open: false, product: {}});
    const p = useSelector(store => store.productItem.productItems);


    const productsList = useSelector(store => store.products.productsList);

    useEffect(() => {
        dispatch(getProductsList());
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id));
    }, [])

    console.log(productsList)
    console.log(p)

    return (
        <Wrapper>
            <div className='container'>

                <button onClick={() => setModal(true)}>
                    Create
                </button>
                <ModalProduct
                    open={modal}
                    onClose={() => setModal(false)}
                />

                <ModalUpdateProduct
                    open={updateModal.open}
                    product={updateModal.product}
                    onClose={() => setUpdateModal({open: false, product: {}})}

                />

                <div className='product__block'>
                    {productsList.map(product => (

                        <div className='product_item__block' key={product.id}>

                            <div className='product_item'>
                                <p>
                                    {/*{product.product_brand.name }*/}
                                    { product.name}
                                </p>

                                <p> {product.price}դր․ </p>
                            </div>

                            <div className='product_item'>
                                <p>
                                    {product.product_brand.name }
                                </p>
                            </div>
                            <div className='product_item'>
                                <p>
                                    {product.product_category.name }
                                </p>
                            </div>

                            <button
                                className='product_item'
                                onClick={() => navigate(`/product/${product.id}`)}>
                                Options
                            </button>
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

export default Product;

// <div key={product.id} style={{display: "flex"}}>
//     <p>{product.name}</p>
//     <button
//         onClick={() => navigate(`/product/${product.id}`)}>
//         Options
//     </button>
//     <button onClick={() => setUpdateModal({open: true, product})}>
//         Edit
//     </button>
//     <button
//         onClick={() => handleDelete(product.id)}>Delete
{/*    </button>*/}

{/*</div>*/}

