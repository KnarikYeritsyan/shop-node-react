import React, {useCallback} from 'react';

import qs from 'query-string';
import {useLocation, useNavigate} from "react-router-dom";
import Utils from "../helpers/Utils";

import _ from 'lodash';

function Filters({title, data, prefix}) {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search)

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
            <ul>
                {data.map(datum => (

                        prefix === 'color'
                            ?
                            <li
                                className={`filter__desc ${query[prefix] === datum.color.toString() ? 'active' : ''}`}
                                // className='filter__desc'
                                key={datum.color}
                                onClick={() => handleFilterChange(datum.color, prefix)}
                            >
                                {datum.color}
                            </li>
                            :
                            <li
                                className={`filter__desc ${query[prefix] === datum.id.toString() ? 'active' : ''}`}
                                // className='filter__desc'
                                key={datum.id}
                                onClick={() => handleFilterChange(datum.id, prefix)}
                            >
                                {datum.name}
                            </li>

                ))}
            </ul>
        </div>
    );
}

export default Filters;