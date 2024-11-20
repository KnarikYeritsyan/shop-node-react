import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import {createCategory, getCategories} from "../store/actions/categories";
import {createBrand, getBrands} from "../store/actions/brands";
import { useDispatch, useSelector } from "react-redux";
import {createProduct} from "../store/actions/products";
import {useParams} from "react-router-dom";
import {createProductItem, updateProductItem} from "../store/actions/productItem";


function ModalProductItem({ open, onClose, product, update }) {
    const dispatch = useDispatch();
    const params = useParams();

    const [formData, setFormData] = useState({
        color: '',
        quantity: '',
        img: null
    });
    console.log(product);
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

    useEffect(() => {
        console.log(product)
        setFormData({...formData, ...product});
    }, [product])

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        if (update) {
            console.log('update')
            dispatch(updateProductItem(params.id, formData))
        } else {
            dispatch(createProductItem(params.id, formData));
        }

        setFormData({
            color: '',
            quantity: '',
            img: null
        });

        onClose();

    }, [formData]);

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
                        value={formData.color}
                        onChange={handleChange('color')}
                        placeholder='product color'
                        required
                    />

                    <input
                        value={formData.quantity}
                        onChange={handleChange('quantity')}
                        type="number"
                        placeholder='product quantity'
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
                        <button>{update? 'Update' : 'Create'}</button>
                    </div>


                </form>

            </div>

        </Modal>
    );
}

export default ModalProductItem;