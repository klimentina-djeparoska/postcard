import React from 'react';
import "./shipping-address.css";
const fields = [
    { name: "Street address:", value: "street" },
    { name: "City:", value: "city" },
    { name: "Country:", value: "country" },
    { name: "Postal code:", value: "postalCode" }
];

const FormFields = (props) => fields.map((field) =>
    <div key={field.value} className="form-group">
        <div className="row">
            <label htmlFor={field.value} className="font-italic col-3">{field.name}</label>
            <div className="col-6">
                <input className="form-control" key={field.value} type="text" onChange={(e)=>props.onChange([field.value, e])}/>
            </div>
        </div>
    </div>
);

const ShippingAddress = (props) => {
    return (
        <div>
            <p className="text-middle font-italic">Shipping address:</p>
            <p className="font-italic">Please fill in the following data:</p>
            <div className="align-content-center">
                <form className="form">
                    <FormFields onChange={(e)=> props.onShippingAddressChange(e)}/>
                </form>
            </div>
        </div>
    );
};

export default ShippingAddress;
