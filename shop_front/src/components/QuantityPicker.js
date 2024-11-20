

// import React, {useState} from 'react';
//
// function QuantityPicker(props) {
//     const [count, setCount] = useState(1);
//     const handleCount = (c) => {
//         if (c < 1) {
//             return null;
//         }
//         setCount(c);
//     }
//     return (
//         <div>
//             <button
//                 onClick={() => handleCount(count - 1)}
//                 className='qty_picker'> -
//             </button>
//             <span>{count}</span>
//             <button
//                 onClick={() => handleCount(count + 1)}
//                 className='qty_picker'> +
//             </button>
//         </div>
//     );
// }
//
// export default QuantityPicker;

// useEffect(() => {
//     dispatch(changeCartItemQty(productId, count));
// }, [count, dispatch]);

// const handleCounts = (c) => {
//     if (c < min) {
//         setCount(min);
//     } else if (c > max) {
//         setCount(max);
//     } else {
//         setCount(c);
//     }
// };

import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changeCartItemQty } from "../store/actions/cart";

function QuantityPicker({ min = 1, qty, productId, productItemQty, handleQty }) {
    // const productItemQty = useSelector(store => store.cart.productItemQty)

    const [count, setCount] = useState(productItemQty || 1);
    const dispatch = useDispatch();

    useEffect(() => {
        handleQty(count)
    }, [count])


    const handleCount = useCallback((c) => {
        if (c < min) {
            setCount(min);
        } else if (c > qty) {
            setCount(qty);
        } else {
            setCount(c);
            dispatch(changeCartItemQty(productId, c));
        }
    }, [count]);

    console.log(productItemQty)

    return (
        <div>
            <button onClick={() => handleCount(count - 1)} className='qty_picker'>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>

            <span style={{display:'inline-block', width: '20px', textAlign: 'center'}}>{count}</span>
            <button onClick={() => handleCount(count + 1)} className='qty_picker'>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
}




// function QuantityPicker({ min = 1, max = 100, productId }) {
//     const [count, setCount] = useState(1);
//     const dispatch = useDispatch();
//
//     // useEffect(() => {
//     //     dispatch(changeCartItemQty(productId, count));
//     // }, [count, dispatch]);
//
//     // const handleCounts = (c) => {
//     //     if (c < min) {
//     //         setCount(min);
//     //     } else if (c > max) {
//     //         setCount(max);
//     //     } else {
//     //         setCount(c);
//     //     }
//     // };
//
//     const handleCount = useCallback((c) => {
//         if (c < min) {
//             setCount(min);
//         } else if (c > max) {
//             setCount(max);
//         } else {
//             setCount(c);
//             dispatch(changeCartItemQty(productId, c));
//         }
//     }, [count]);
//
//
//     const handleInputChange = (e) => {
//         let value = e.target.value;
//         if (!isNaN(value) && value >= min && value <= max) {
//             setCount(value);
//         }
//     };
//
//     console.log(count)
//     return (
//         <div>
//             <button onClick={() => handleCount(count - 1)} className='qty_picker'>
//                 -
//             </button>
//             <input
//                 type='text'
//                 value={count}
//                 onChange={handleInputChange}
//                 className='qty_input'
//             />
//             <button onClick={() => handleCount(count + 1)} className='qty_picker'>
//                 +
//             </button>
//         </div>
//     );
// }

export default QuantityPicker;

