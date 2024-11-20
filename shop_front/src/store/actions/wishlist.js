export const TOGGLE_FAVORITE_REQUEST = 'TOGGLE_FAVORITE_REQUEST';
export const TOGGLE_FAVORITE_SUCCESS = 'TOGGLE_FAVORITE_SUCCESS';
export const TOGGLE_FAVORITE_FAIL = 'TOGGLE_FAVORITE_FAIL';

export function toggleFavorites(productId) {

    return {
        type: TOGGLE_FAVORITE_REQUEST,
        payload: {
            productId
        }
    }
}

export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
export const GET_WISHLIST_FAIL    = 'GET_WISHLIST_FAIL';

export function getWishlist() {

    return {
        type: GET_WISHLIST_REQUEST,
        payload: {}
    }
}