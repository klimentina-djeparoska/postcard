import React, {Component} from "react";
import "./tabs.css";
import {getImageUrl} from '../../sanity/sanityClientApi';
import {Link} from "react-router-dom";
import {getImage} from "../../../repository/imageRepository";

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
                                    <Link to={"/create-postcard"} className="mb-lg-5"><button className="btn btn-info create-btn">Create postcard</button></Link>
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
                                <DisplayImage postcardId={order.postcardId}/>
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

class DisplayImage extends Component {
 
    constructor(props) {
        super(props);
        this.state = {imageUrl: null};
    }

    componentDidMount() {
        getImage(this.props.postcardId).then(res => {
            this.setState({
                imageUrl: res
            });
        });
    }

    render(){
        return (
            this.state.imageUrl?
                <img src={this.state.imageUrl} alt={this.props.postcardId}/>
                : <div>Loading..</div>
      );
    }
}

export default Orders;
