import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import { getCategories } from "../store/actions/categories";
import { getBrands } from "../store/actions/brands";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/actions/products";

function ModalUpdateProduct({open, onClose, product}) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categories.categories);
    const brands = useSelector(store => store.brands.brands);

    const [formData, setFormData] = useState({
        description: '',
        name: '',
        price: '',
        categoryId: 1,
        brandId: 1,
    });

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
    }, [])

    useEffect(() => {
        setFormData({...formData, ...product});
    }, [product])


    const handleChange = useCallback((key) => (ev) => {
        setFormData({...formData, [key]: ev.target.value})
    }, [formData]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        console.log(formData)

        dispatch(updateProduct(formData, product.id));

        // setFormData([])
        onClose();


    }, [formData]);

    console.log(formData)
    return (
        <Modal
            isOpen={open}
            bodyOpenClassName="body__modal"
            overlayClassName="testOverlay"
            className="testContent"
            onRequestClose={onClose}
        >
            <div className='close_btn_block'>
                <button onClick={onClose}>X</button>
            </div>


            <div className='modal__container'>

                <form onSubmit={handleSubmit}>

                    <select
                        style={{marginRight: '22px'}}
                        value={formData.categoryId}
                    >
                        {categories?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={formData.brandId}
                        onChange={handleChange('brandId')}
                    >
                        {brands?.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    <input
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder='product name'
                        required
                    />

                    <input
                        value={formData.price}
                        onChange={handleChange('price')}
                        type="number"
                        placeholder='product price'
                        required
                    />

                    <textarea
                        cols="30"
                        rows="10"
                        placeholder='product description'
                        value={formData.description}
                        onChange={handleChange('description')}
                        required
                    />

                    <div className='btn'>
                        <button>Update</button>
                    </div>


                </form>

            </div>

        </Modal>
    );
}

export default ModalUpdateProduct;