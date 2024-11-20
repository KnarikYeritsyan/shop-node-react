import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS   ,
    GET_PRODUCTS_LIST_FAIL,
    GET_ONE_PRODUCT_REQUEST,
    GET_ONE_PRODUCT_SUCCESS,
    GET_ONE_PRODUCT_FAIL,
    CREATE_PRODUCT_RATING_REQUEST,
    CREATE_PRODUCT_RATING_SUCCESS,
    CREATE_PRODUCT_RATING_FAIL,

} from "../actions/products";
import {toast} from "react-toastify";

const initialState = {
    productsList: [],
    total_pages: 0,
    product: {},
    products: [],
    productsListRequestStatus: '',
    createProductRatingRequestStatus: '',
    oneProductRequestStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_REQUEST: {
            return {
                ...state,
                productsListRequestStatus: 'request',
                productsList: []
            }
        }

        case GET_PRODUCTS_LIST_SUCCESS: {
            const { products, total, per_page } = action.payload.data

            return {
                ...state,
                productsList: products,
                total_pages: Math.ceil(total / per_page),
                productsListRequestStatus: 'ok'
            }
        }

        case GET_PRODUCTS_LIST_FAIL: {
            return {
                ...state,
                productsListRequestStatus: 'fail',
            }
        }

        case GET_ONE_PRODUCT_REQUEST: {
            return {
                ...state,
                product: {},
                oneProductRequestStatus: 'request',
            }
        }

        case GET_ONE_PRODUCT_SUCCESS: {

            const { product, products } = action.payload.data

            return {
                ...state,
                product,
                products,
                oneProductRequestStatus: 'ok'
            }
        }

        case GET_ONE_PRODUCT_FAIL: {
            return {
                ...state,
                oneProductRequestStatus: 'fail',
            }
        }

        case CREATE_PRODUCT_RATING_REQUEST: {
            return {
                ...state,
                createProductRatingRequestStatus: 'request',
            }
        }

        case CREATE_PRODUCT_RATING_SUCCESS: {

            const { data } = action.payload.data

            // toast.success(`Rating created`, {
            //     style: {top: 55, right: 0},
            //     autoClose: 1500,
            // })

            return {
                ...state,
                createProductRatingRequestStatus: 'ok'
            }
        }

        case CREATE_PRODUCT_RATING_FAIL: {
            const { data } = action.payload.data
            return {
                ...state,
                createProductRatingRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_PRODUCTS_LIST_REQUEST: {
//             return {
//                 ...state,
//                 product: action.payload.data
//             }
//         }
//         default: {
//             return {
//                 ...state
//             }
//         }
//     }
// }
