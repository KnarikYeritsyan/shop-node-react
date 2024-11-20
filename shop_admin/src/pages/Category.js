import React, {useCallback, useEffect, useState} from 'react';
import {deleteCategory, getCategories} from "../store/actions/categories";
import { useDispatch, useSelector } from "react-redux";
import ItemModal from "../components/ItemModal";
import Wrapper from "../components/Wrapper";

function Category(props) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categories.categories);

    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({open: false, category: {}});


    useEffect(() => {
        dispatch(getCategories())
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(deleteCategory(id));
    }, [])

    console.log(categories)
    return (
        <Wrapper>
            <div className='container'>
                <button onClick={() => setModal(true)}>
                    Create
                </button>

                <ItemModal
                    open={modal}
                    model='category'
                    onClose={() => setModal(false)}
                />

                <ItemModal
                    open={updateModal.open}
                    obj={updateModal.category}
                    model='category'
                    onClose={() => setUpdateModal({open: false, category: {}})}

                />

                <div className='category__block'>
                    {categories?.map(c => (
                        <div key={c.id} className='category__item__block'>
                            <div className='category__item'>
                                <p>{c.name}</p>
                            </div>

                            <button onClick={() => setUpdateModal({open: true, category: c})}>
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}
                </div>




            </div>
        </Wrapper>

    );
}

export default Category;


// import React, {useEffect, useState} from 'react';
// import { getCategories} from "../store/actions/categories";
// import { useDispatch, useSelector } from "react-redux";
// import UpdateModal from "../components/updateModal";
//
// function Category() {
//     const dispatch = useDispatch();
//     const categories = useSelector(store => store.categories.categories);
//     const [updateModal, setUpdateModal] = useState({open: false, category: {}});
//
//
//     useEffect(() => {
//         dispatch(getCategories())
//     }, []);
//
//     return (
//         <div>
//             <UpdateModal
//                 category={updateModal.category}
//                 open={updateModal.open}
//                 onClose={() => setUpdateModal({open: false, category: {}})}
//             />
//             {categories?.map(category => (
//                 <div>
//                     <span>{category.name}</span>
//                     <button onClick={() => setUpdateModal({open: true, category: category})}
//                     >
//                         Update
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default Category;