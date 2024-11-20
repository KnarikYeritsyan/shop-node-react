import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOneProduct} from "../store/actions/products";
import {useLocation, useParams, useNavigate} from "react-router-dom";


import _ from "lodash"
import Wrapper from "../components/Wrapper";


function SingleProduct(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const product = useSelector(store => store.products.product);
    const products = useSelector(store => store.products.products);

    const [rating, setRating] = useState(0);
    const location = useLocation();

    useEffect(() => {
        dispatch(getOneProduct(params.id))

    }, [params.id]);


    const addToCart = useCallback(() => {
        // dispatch(addToCartRequest(product.id))
    }, [product.id]);

    const handleSubmit = useCallback((e) => {
        console.log(product)
        console.log(product.product_item)
        e.preventDefault();
        // dispatch(createProductRating(product.product_item.id, rating));
    }, [rating])

    const handleSelectChange = useCallback((e) => {
        setRating(e.target.value)
    }, [rating])

    console.log(rating)
    console.log(product)

    return (
        <Wrapper>

            {!_.isEmpty(product) ?
                <div>
                    {/*{product.item_products[0].img}*/}
                    <img src={product.img} alt="" style={{width: '200px'}}/>
                    <h2>{product.product_item.product_brand.name}  {product.product_item.name}</h2>
                    <p>({product.color})</p>
                    <p>{product.product_item.price} դր․</p>

                    <div>
                        <h5>create rating</h5>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <select value={rating}
                                        onChange={handleSelectChange}>
                                    <option value="">Select...</option>
                                    <option value="1">Poor</option>
                                    <option value="2">Fair</option>
                                    <option value="3">Good</option>
                                    <option value="4">Very Good</option>
                                    <option value="5">Excellent</option>
                                </select>
                            </div>

                            <button>rating</button>
                        </form>
                    </div>

                    <h4>Description</h4>
                    <p>{product.product_item.description}</p>

                </div>:null
            }

            <button
                style={{cursor: "pointer"}}
                onClick={addToCart}>
                Add to cart
            </button>

            {products?.map(p => (
                    <div
                        key={p.id}
                        onClick={() => navigate(`/product/${p.id}`)}>
                        <img src={p.img} alt="" style={{width: '100px'}}/>
                    </div>
            )
            )}


        </Wrapper>
    )
}

export default SingleProduct;