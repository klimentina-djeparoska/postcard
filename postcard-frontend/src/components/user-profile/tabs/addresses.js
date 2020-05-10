import React from "react";
import './tabs.css';

export const Address = (props) => {
    return (<div className="custom-address">
        <p className="text-middle font-italic mb-lg-5">Shipping address:</p>
        <div className="row">
            <label className="col-4 font-italic">Street address: </label>
            <span className="col-8 font-italic">{props.address.street}</span>
        </div>
        <div className="row">
            <label className="col-4 font-italic">City: </label>
            <span className="col-8 font-italic">{props.address.city}</span>
        </div>
        <div className="row">
            <label className="col-4 font-italic">Country: </label>
            <span className="col-8 font-italic">{props.address.country}</span>
        </div>
        <div className="row">
            <label className="col-4 font-italic">Postal code: </label>
            <span className="col-8 font-italic">{props.address.postalCode}</span>
        </div>
        {
            props.addressTab?
                <div className="mb-5 mt-5">
                    <button onClick={() => props.deleteAddress(props.address)} className="btn btn-danger m-auto">Delete address</button>
                </div>:
                <div></div>
        }
    </div>);
};

const Addresses = (props) => {

    return (
        <div>
            {
                props.addresses.length?
                    <div className="row mt-lg-5">
                        <div className="col-12">
                            <p className="align-items-center font-italic">Saved shipping addresses:</p>
                        </div>
                        <div className="custom-row">
                            { props.addresses.map(address =>
                                <Address addressTab={true} deleteAddress={e => props.deleteSpecificAddress(e)} key={address.street+address.city} address={address}/>
                            )}
                        </div>
                    </div>:
                    <div className="mt-lg-5">
                        <p className="align-items-center font-italic">You haven't saved any address yet! :)</p>
                    </div>
            }
        </div>
    );
};

export default Addresses;
