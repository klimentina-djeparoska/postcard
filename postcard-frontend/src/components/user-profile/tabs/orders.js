import React, {Component} from "react";
import "./tabs.css";
import {Link} from "react-router-dom";
import {getImage} from "../../../repository/imageRepository";
import {Address} from "./addresses";
import Select from 'react-select';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOption: 'date'
        };
        this.sortingOptions = [
            {value: 'price', label: 'Price'},
            {value: 'date', label: 'Date'},
            {value: 'street', label: 'Street'},
            {value: 'city', label: 'City'},
            {value: 'country', label: 'Country'}
        ]
    }

    sortOrders(option) {
        const orders = this.props.orders;
        if (orders) {
            orders.sort((ord1, ord2) => {
                if(ord1[option] > ord2[option]) return 1;
                if(ord1[option] < ord2[option]) return -1;
                return 0;
            });

            this.props.updateOrders(orders);
        }
    }

    render () {
        return (
            this.props.orders?
                <div className="row">
                    <div className="col-12">
                        {
                            this.props.orders.length?
                                <div>
                                    <p className="text-middle font-italic mt-lg-5">Here are your orders so far:</p>
                                    <div className="row mb-5 mt-5">
                                        <p className="col-6">Find the wanted order faster. Sort orders by: </p>
                                        <div className="col-6">
                                            <Select onChange={(e => this.sortOrders(e.value))} options={this.sortingOptions}/>
                                        </div>
                                    </div>

                                </div>

                                : <div className="mt-lg-5">
                                    <p className="text-middle font-italic">You haven't made any order yet <br/> Make your first order </p>
                                    <Link to={"/create-postcard"} className="mb-lg-5"><button className="btn btn-info create-btn">Create postcard</button></Link>
                                </div>
                        }

                    </div>
                <div className="col-12">
                    {this.props.orders.map(order =>
                        <div key={order.id} className="row mb-lg-5">
                            <div className="col-6 add-border">
                                <Address address={order}/>
                            </div>
                            <div className="col-6 border border-left-0">
                                <DisplayImage postcardId={order.postcardId}/>
                                <div>
                                    <p>Order date: {order.date}</p>
                                    <p className="text-middle font-italic"> Status:</p>
                                    <div className={order.status}>{order.status}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            : <p>Loading..</p>
    );}
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
                <img className="show-img" src={this.state.imageUrl} alt={this.props.postcardId}/>
                : <div>Loading..</div>
      );
    }
}

export default Orders;
