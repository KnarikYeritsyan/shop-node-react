import React, {useCallback} from 'react';

import qs from 'query-string';
import {useLocation, useNavigate} from "react-router-dom";
import Utils from "../helpers/Utils";

import _ from 'lodash';

// function colorBox({ color }) {
//     const style = {
//         backgroundColor: color,
//         width: '100px',
//         height: '100px',
//     };
//     return style;
// }

// function colorBox(color) {
//     return {
//         backgroundColor: color,
//         width: '100px',
//         height: '100px',
//     };
// }

function FilterByColor({title, data, prefix}) {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);

    const colorBox = (color) => {
        return {
            backgroundColor: color,
        };
    }

    const handleFilterChange = useCallback((id, prefix) => {

        if (query[prefix] === id.toString()) {
            query[prefix] = null
        } else {
            query[prefix] = id
        }

        navigate(`?${Utils.queryStrfy({...query})}`)

    }, [query])

    return (
        <div>
            <p className='filter__title'>{title}</p>
            <ul style={{display: "flex", flexWrap: 'wrap'}}>
                {data.map(datum => (

                    <>
                        <div
                            className={`color__desc ${query[prefix] === datum.color.toString() ? 'active' : ''}`}
                            // className='filter__desc'
                            key={datum.color}
                            onClick={() => handleFilterChange(datum.color, prefix)}
                            style={colorBox(datum.color)}
                        ></div>

                    </>



                ))}
            </ul>
        </div>
    );
}

export default FilterByColor;