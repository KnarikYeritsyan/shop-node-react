import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import {createCategory, getCategories} from "../store/actions/categories";
import {createBrand, getBrands} from "../store/actions/brands";
import { useDispatch, useSelector } from "react-redux";
import {createProduct} from "../store/actions/products";
import {toast} from "react-toastify";




function ModalProduct({open, onClose}) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categories.categories);
    const brands = useSelector(store => store.brands.brands);
    const status = useSelector(store => store.products.createProductRequestStatus);


    const [formData, setFormData] = useState({
        desc: '',
        name: '',
        color: '',
        price: '',
        qty: '',
        categoryId: 0,
        brandId: 0,
        img: null
    });

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
    }, [])



    const handleChange = useCallback((key) => (ev) => {
        setFormData({...formData, [key]: ev.target.value})
    }, [formData]);

    const handleFileChange = useCallback((ev) => {
        const [file] = ev.target.files;
        const acceptableMimeTypes = ['image/jpeg','image/png','image/jpg']
        if (!file) {
            return;
        }

        if (!acceptableMimeTypes.includes(file.type)) {
            alert('nooo');
            ev.target.value = '';
            return;
        }

        file._preview = URL.createObjectURL(file);
        // const newData = { ...formData, img: file };
        setFormData({...formData, img: file});

        ev.target.value = '';
    }, [formData]);


    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        console.log(formData)

        dispatch(createProduct(formData));

        setFormData({
            desc: '',
            name: '',
            color: '',
            price: '',
            qty: 1,
            categoryId: 0,
            brandId: 0,
            img: null
        });

        if (status === 'ok') {
            onClose();
            toast.success(`the product is created`, {
                style: {top: 55, right: 0},
                autoClose: 1500,
            })
        }




    }, [formData, status]);

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

                    <input
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder='product name'
                        required
                    />


                    <input
                        value={formData.color}
                        onChange={handleChange('color')}
                        placeholder='product color'
                        required
                    />
                    <input
                        value={formData.price}
                        onChange={handleChange('price')}
                        type="number"
                        placeholder='product price'
                        required
                    />
                    <input
                        value={formData.qty}
                        onChange={handleChange('qty')}
                        type="number"
                        placeholder='product quantity'
                        required
                    />

                    <select
                        style={{marginRight: '22px'}}
                        value={formData.categoryId}
                        onChange={handleChange('categoryId')}
                        required
                    >
                        <option value="">Select...</option>
                        {categories?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={formData.brandId}
                        onChange={handleChange('brandId')}
                        required
                    >
                        <option value="">Select...</option>
                        {brands?.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    <textarea
                        cols="30"
                        rows="10"
                        placeholder='product description'
                        value={formData.desc}
                        onChange={handleChange('desc')}
                        required
                    />

                    {formData.img ? (
                        <img src={formData.img._preview} width={128} alt="" />
                    ) : null}

                    <input type="file"
                           accept="image/jpeg,image/png,image/jpg"
                           onChange={handleFileChange}
                    />

                    <div className='btn'>
                        <button>Create</button>
                    </div>



                </form>

            </div>

        </Modal>
    );
}

export default ModalProduct;
