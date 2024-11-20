import React, {useCallback, useState} from 'react';
import Wrapper from "../components/Wrapper";
import Input from "../components/Input";
import {useDispatch, useSelector} from "react-redux";import {saveShippingAddress} from "../store/actions/order";

function Shipping(props) {
    const dispatch = useDispatch();


    const shippingAddress = useSelector(store => store.order.shippingAddress);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        address: '',
        postalCode: '',
    });

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData]);


    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        console.log(formData)
        dispatch(saveShippingAddress(formData,  (err, data) => {
            if (err) {
                setErrors(err.errors);
                return
            }
            // navigate('/login');
        }));
    }, [formData]);

    console.log(shippingAddress)
    return (
        <Wrapper>
            <div>
                <form onSubmit={handleSubmit}>

                    <Input
                        value={formData.country}
                        onChange={handleChange('country')}
                        placeholder="country"
                        error={errors.country}
                        required
                    />
                    <Input
                        value={formData.city}
                        onChange={handleChange('city')}
                        error={errors.city}
                        placeholder="city"
                        required
                    />
                    <Input
                        value={formData.address}
                        onChange={handleChange('address')}
                        error={errors.address}
                        placeholder="address"
                        required
                    />
                    <Input
                        value={formData.postalCode}
                        onChange={handleChange('postalCode')}
                        error={errors.postalCode}
                        placeholder="postalCode"
                        required
                    />

                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">
                            Continue
                        </button>
                    </div>

                </form>
            </div>
        </Wrapper>
    );
}

export default Shipping;



