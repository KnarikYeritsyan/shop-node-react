import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

// import './App.css';
import {getProductsList} from "../store/actions/products";
import {getBrands} from "../store/actions/brands";
import {getCategories, getColors} from "../store/actions/categories";
import {useLocation, useNavigate} from "react-router-dom";

import qs from 'query-string'
import ProductItem from "../components/ProductItem";
import Wrapper from "../components/Wrapper";
import Filters from "../components/Filters";
import InputSearch from "../components/InputSearch";
import FilterByPrice from "../components/FilterByPrice";
import WrapperLogOut from "../components/WrapperLogOut";
import Rating from "../components/Ratings";
import AddCartBtn from "../components/AddCartBtn";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import FilterByColor from "../components/FilterByColor";

import Modal from 'react-modal';

import _ from 'lodash'


function Home(props) {

    const dispatch = useDispatch();

    const brands = useSelector(store => store.brands.brands);
    const categories = useSelector(store => store.categories.categories);
    const colors = useSelector(store => store.categories.colors);
    const productsList = useSelector(store => store.products.productsList);
    const total_pages = useSelector(store => store.products.total_pages);
    const status = useSelector(store => store.products.productsListRequestStatus);
    const location = useLocation();
    const token = useSelector(store => store.users.token);

    const [modal, setModal] = useState(false);
    const [showFilters, setShowFilters] = useState(window.innerWidth > 998);


    console.log('widthhhhhhhhhh', window.innerWidth)

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getColors())

        const handleResize = () => {
            setShowFilters(window.innerWidth > 998);
            if (window.innerWidth > 998) setModal(false);

        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [token]);


    useEffect(() => {
        const query = qs.parse(location.search);
        dispatch(getProductsList(query));
    }, [location.search, token])

    useEffect(() => {
        // console.log('ProductItem')
    }, [])

    return (

        <div>
            {token
                ?
                <Wrapper className="App">
                    <div className='shop__container'>


                        {showFilters ? (
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <FilterByColor title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        ) : (
                            <div className='filters__btn'>
                                <button onClick={() => setModal(true)}>
                                    <span className="material-symbols-outlined">tune</span>
                                </button>
                                {/*<button onClick={() => setModal(true)}>*/}
                                {/*    <span className="material-symbols-outlined">page_info</span>*/}
                                {/*</button>*/}

                            </div>

                        )}

                        <Modal
                            isOpen={modal}
                            onRequestClose={() => setModal(false)}
                            bodyOpenClassName="body__modal"
                            overlayClassName="filtersOverlay"
                            className="filtersContent"

                        >
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <FilterByColor title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        </Modal>




                        <div className='shop__item__block'>

                            {status === 'request'
                                ?
                                <Loading/>
                                // <div><h1>Loading</h1></div>
                                : null
                            }

                            {status === 'ok' && _.isEmpty(productsList)
                                ?
                                <div style={{width: '100%', textAlign: 'center'}}>
                                    <h2 style={{color: '#6b758c'}}>By the following criteria nothing was found</h2>

                                </div>
                                // <div><h1>Loading</h1></div>
                                : null
                            }

                            {productsList?.map(product => (
                                <ProductItem product = {product} key={product.id}/>
                                )

                            )}

                            <div className='pagination__block'>
                                <Pagination total={total_pages}/>
                            </div>

                        </div>

                    </div>

                </Wrapper>
                :
                <WrapperLogOut className="App">
                    <div className='shop__container'>

                        {showFilters ? (
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <FilterByColor title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        ) : (
                            <div className='filters__btn'>
                                <button onClick={() => setModal(true)}>
                                    <span className="material-symbols-outlined">tune</span>
                                </button>
                            </div>
                        )}

                        <Modal
                            isOpen={modal}
                            onRequestClose={() => setModal(false)}
                            bodyOpenClassName="body__modal"
                            overlayClassName="filtersOverlay"
                            className="filtersContent"

                        >
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <FilterByColor title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        </Modal>




                        <div className='shop__item__block'>

                            {status === 'request'
                                ?
                                <Loading/>
                                : null
                            }

                            {status === 'ok' && _.isEmpty(productsList)
                                ?
                                <div style={{width: '100%', textAlign: 'center'}}>
                                    <h2 style={{color: '#6b758c'}}>By the following criteria nothing was found</h2>

                                </div>
                                // <div><h1>Loading</h1></div>
                                : null
                            }

                            {productsList?.map(product => (
                                    <ProductItem product = {product}/>
                                )

                            )}

                            <div className='pagination__block'>
                                <Pagination total={total_pages}/>
                            </div>


                        </div>
                    </div>



                </WrapperLogOut>
            }
        </div>




    );
}

export default Home;



//
// import React, {useCallback, useEffect, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {deleteFromCartRequest, getCartRequest} from "../store/actions/cart";
// import QuantityPicker from "../components/QuantityPicker";
// import Wrapper from "../components/Wrapper";
// import { notification } from 'antd';
//
// function ShoppingCartPage() {
//     const dispatch = useDispatch();
//
//     const cartList = useSelector(store => store.cart.cartList);
//     const [quantity, setQuantity] = useState();
//
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//
//
//     console.log(cartList)
//     useEffect(() => {
//         dispatch(getCartRequest())
//     }, [])
//
//     const handleCount = useCallback((c) => {
//         setQuantity(c);
//     }, [quantity]);
//
//
//
//
//     const handleDelete = useCallback((id) => {
//         dispatch(deleteFromCartRequest(id));
//     }, []);
//     console.log('tttttttttttt')
//
//     const handleBuyNow = useCallback(() => {
//         setLoading(true);
//
//         const orderDetails = {
//             items: cartList,
//         };
//
//         dispatch(makeOrderRequest(orderDetails))
//             .then(() => {
//                 notification.success({
//                     message: 'Order placed successfully!',
//                     description: 'Your order has been placed successfully, we will get back to you soon.',
//                 });
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setLoading(false);
//                 setError(err.message);
//                 notification.error({
//                     message: 'Order failed!',
//                     description: err.message,
//                 });
//             });
//     }, [cartList]);
//
//
//
//
//     // const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//
//     return (
//         <Wrapper>
//             <div className='cart_container'>
//                 <div className='cart__block'>
//                     <h2>Cart</h2>
//                     {cartList.map(cart => (
//                         <div className='cart_item__block' key={cart.cartProduct.id}>
//                             <div className='cart_item'>
//                                 <img src={cart.cartProduct.img} alt=""/>
//                             </div>
//
//                             <div className='cart_item'>
//                                 <p>
//                                     {cart.cartProduct.product_item.product_brand.name }  { cart.cartProduct.product_item.name}
//                                 </p>
//                                 <p>({cart.cartProduct.color})</p>
//                                 <p> {cart.cartProduct.product_item.price}դր․ </p>
//                             </div>
//
//                             {/*<div style={{marginLeft:'20px'}}>*/}
//                             {/*    <p> {cart.cartProduct.product_item.price} </p>*/}
//                             {/*</div>*/}
//
//
//                             <div className='cart_item'>
//                                 <QuantityPicker
//                                     productId={cart.cartProduct.id}
//                                     productItemQty={cart.quantity}
//                                     handleQty={handleCount}
//                                 />
//                             </div>
//
//                             <div className='cart_item'>
//                                 {/*<p>{quantity * cart.cartProduct.product_item.price}</p>*/}
//                                 <button onClick={() => handleDelete(cart.cartProduct.id)}>Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//
//                 <button>buy now</button>
//
//             </div>
//         </Wrapper>
//
//     );
// }
//
// export default ShoppingCartPage;
