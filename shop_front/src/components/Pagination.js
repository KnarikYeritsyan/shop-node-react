import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';
import {useLocation, useNavigate} from "react-router-dom";
import qs from "query-string";

import Utils from "../helpers/Utils";

function Pagination(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search)
    const { total } = props

    const handleClick = useCallback((page) => {
        navigate(`?${Utils.queryStrfy({ ...query, page })}`);
        // window.scrollBy({top: 400, left: 0})
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, [query]);


    useEffect(() => {

        if (query.page > total || query.page === undefined) {
            // query.page = 1
            navigate(`?${Utils.queryStrfy({ ...query, page: 1 })}`);

        }

    }, [total])

    if (total < 2) {
        return null;
    }

    console.log(typeof (query.page))

    return (
        <ul className='pagination'>
            {_.range(1, total + 1).map(page => (
                <li

                    key={page}
                    className={page === +query.page ? 'active' : ''}
                    onClick={() => handleClick(page)}
                >
                    {page}
                </li>
            ))}

        </ul>
    );
}

export default Pagination;