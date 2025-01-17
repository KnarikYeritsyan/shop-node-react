import {
    GET_PRODUCT_ITEM_REQUEST,
    GET_PRODUCT_ITEM_SUCCESS,
    GET_PRODUCT_ITEM_FAIL,
    CREATE_PRODUCT_ITEM_REQUEST,
    CREATE_PRODUCT_ITEM_SUCCESS,
    CREATE_PRODUCT_ITEM_FAIL,
    UPDATE_PRODUCT_ITEM_REQUEST,
    UPDATE_PRODUCT_ITEM_SUCCESS,
    UPDATE_PRODUCT_ITEM_FAIL,
    DELETE_PRODUCT_ITEM_REQUEST,
    DELETE_PRODUCT_ITEM_SUCCESS,
    DELETE_PRODUCT_ITEM_FAIL

} from "../actions/productItem";

const initialState = {
    productItems: [],
    productItemRequestStatus: '',
    createProductItemReqStatus: '',
    updateProductItemReqStatus: '',
    deleteProductItemReqStatus: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                productItemRequestStatus: 'request',
            }
        }

        case GET_PRODUCT_ITEM_SUCCESS: {
            const { products } = action.payload.data
            console.log(products)
            return {
                ...state,
                productItems: products,
                productItemRequestStatus: 'ok',

            }
        }

        case GET_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                productItemRequestStatus: 'fail',

            }
        }

        case CREATE_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                createProductItemReqStatus: 'request',
            }
        }

        case CREATE_PRODUCT_ITEM_SUCCESS: {
            return {
                ...state,
                createProductItemReqStatus: 'ok',

            }
        }

        case CREATE_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                createProductItemReqStatus: 'fail',

            }
        }

        case UPDATE_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                updateProductItemReqStatus: 'request',
            }
        }

        case UPDATE_PRODUCT_ITEM_SUCCESS: {
            return {
                ...state,
                updateProductItemReqStatus: 'ok',

            }
        }

        case UPDATE_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                updateProductItemReqStatus: 'fail',

            }
        }

        case DELETE_PRODUCT_ITEM_REQUEST: {
            return {
                ...state,
                deleteProductItemReqStatus: 'request',
            }
        }

        case DELETE_PRODUCT_ITEM_SUCCESS: {
            return {
                ...state,
                deleteProductItemReqStatus: 'ok',

            }
        }

        case DELETE_PRODUCT_ITEM_FAIL: {
            return {
                ...state,
                deleteProductItemReqStatus: 'fail',

            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}