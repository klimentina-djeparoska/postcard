import React from "react";
import "./tabs.css";
import {getImageUrl} from '../../sanity/sanityClientApi';
import {Link} from "react-router-dom";

const Orders = (props) => {
    return (
        props.orders?
            <div className="row">
                    <div className="col-12">
                        {
                            props.orders.length?
                                <p className="text-middle font-italic mt-lg-5">Here are your orders so far:</p>
                                : <div className="mt-lg-5">
                                    <p className="text-middle font-italic">You haven't made any order yet <br/> Make your first order </p>
                                    <Link to={"/login"} className="mb-lg-5"><button className="btn btn-info create-btn">Create postcard</button></Link>
                                </div>
                        }

                    </div>
                <div className="col-12">
                    {props.orders.map(order =>
                        <div key={order.id} className="row mb-lg-5">
                            <div className="col-6 border">
                                <p className="text-middle font-italic mb-lg-5">Shipping address:</p>
                                <div className="row">
                                    <label className="col-4 font-italic">Street address: </label>
                                    <span className="col-8 font-italic">{order.street}</span>
                                </div>
                                <div className="row">
                                    <label className="col-4 font-italic">City: </label>
                                    <span className="col-8 font-italic">{order.city}</span>
                                </div>
                                <div className="row">
                                    <label className="col-4 font-italic">Country: </label>
                                    <span className="col-8 font-italic">{order.country}</span>
                                </div>
                                <div className="row">
                                    <label className="col-4 font-italic">Postal code: </label>
                                    <span className="col-8 font-italic">{order['country_code']}</span>
                                </div>
                            </div>
                            <div className="col-6 border border-left-0">
                                <img src={getImageUrl("image image-493b19b61ec26aea94358c7f356c9dd910e01e96-6000x4000-jpg")} alt={order.image}/>
                                <div>
                                    <p className="text-middle font-italic"> Status:</p>
                                    <div className={order.status}>{order.status}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            : <p>Loading..</p>
    );
};

export default Orders;
