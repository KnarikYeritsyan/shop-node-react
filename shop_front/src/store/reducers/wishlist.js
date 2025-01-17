import {
    TOGGLE_FAVORITE_REQUEST,
    TOGGLE_FAVORITE_SUCCESS,
    TOGGLE_FAVORITE_FAIL,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,

} from "../actions/wishlist";
import {toast} from "react-toastify";

const initialState = {
    wishlist: [],
    isFavorite: null,
    getWishlistRequestStatus: '',
    toggleFavoriteRequestStatus: '',

};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case TOGGLE_FAVORITE_REQUEST: {
            return {
                ...state,
                toggleFavoriteRequestStatus: 'request',

            }
        }

        case TOGGLE_FAVORITE_SUCCESS: {

            const { isFavorite } = action.payload.data

            // toast.success(`Rating created`, {
            //     style: {top: 55, right: 0},
            //     autoClose: 1500,
            // })

            return {
                ...state,
                isFavorite,
                toggleFavoriteRequestStatus: 'ok'
            }
        }

        case TOGGLE_FAVORITE_FAIL: {
            const { data } = action.payload.data
            return {
                ...state,
                toggleFavoriteRequestStatus: 'fail',
            }
        }



        case GET_WISHLIST_REQUEST: {
            return {
                ...state,
                wishlist: [],
                getWishlistRequestStatus: 'request',
            }
        }

        case GET_WISHLIST_SUCCESS: {

            const { wishlist } = action.payload.data

            return {
                ...state,
                wishlist,
                getWishlistRequestStatus: 'ok'
            }
        }

        case GET_WISHLIST_FAIL: {
            return {
                ...state,
                getWishlistRequestStatus: 'fail',
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
