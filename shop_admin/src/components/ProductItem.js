import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getProductsList} from "../store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import qs from "query-string";

function ProductItem() {

    const productsList = useSelector(store => store.products.productsList);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const query = qs.parse(location.search)

    useEffect(() => {
        const query = qs.parse(location.search);
        dispatch(getProductsList(query));
    }, [location.search])

    // console.log(query, typeof(query))
    return (
        <div>
            {productsList?.map(p => (
                    <div
                        onClick={() => navigate(`/product/${p.item_product.id}`)}
                        key={p.item_product.id}
                    >

                        <img src={p.item_product.img} alt="" style={{width: '200px'}}/>
                        <h3>{p.product_brand.name} {p.name}</h3>
                        <p>{p.price} դր․</p>

                    </div>
                )

            )}
        </div>
    );
}

export default ProductItem;