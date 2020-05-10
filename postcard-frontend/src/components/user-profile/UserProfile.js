import React, {Component} from 'react';
import SignOutButton from "../sign-out/sign-out";
import './user-profile.css';
import Orders from "./tabs/orders";
import General from "./tabs/general";
import Addresses from "./tabs/addresses";
import {getAllOrdersForUser} from "../../repository/orderRepository";
import {deleteAddress, getSavedAddressesForUser} from "../../repository/addressRepository";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'general',
            orders: null,
            addresses: [],
        }
    }

    onClickHandle(tab) {
        if (this.state.activeTab === tab) {
            this.setState({
                activeTab: 'general'
            });
        } else {
            this.setState({
                activeTab: tab
            });
        }


        if(tab === 'orders') {
            getAllOrdersForUser(this.props.user.uid).then(result => {
                this.setState({
                    orders: result
                });
            }).catch(error => console.error(error.message));
        }

        if (tab === 'addresses') {
            getSavedAddressesForUser(this.props.user.uid).then(result => {
                this.setState({
                    addresses: result
                });
            }).catch(error => console.log(error.message));
        }
    }


    deleteAddress (address) {
        deleteAddress(address);
        const addresses = this.state.addresses;
        const result = [];
        for (const add of addresses) {
            if((add.street !== address.street) || (add.city !== address.city) || (add.country !== address.country) || (add.postalCode !== address.postalCode)) {
                result.push(add);
            }
        }
        this.setState({
            addresses: result
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 bg-column">
                        <div className="profile">
                            <img alt={this.props.user.displayName} className="user-img" src={this.props.user.photoURL}/>
                            <p className="name-text">{this.props.user.displayName}</p>
                        </div>
                        <div className="tab-info">
                            <button className="no-deco" onClick={()=>this.onClickHandle('addresses')}>Saved address</button>
                        </div>
                        <div className="tab-info">
                            <button className="no-deco" onClick={()=>this.onClickHandle('orders')}>Orders</button>
                        </div>
                        <div className="tab-info">
                            <SignOutButton user={this.props.user}   signOut={()=> this.props.onUserSignOut(null)}/>
                        </div>

                    </div>
                    <div className="col-md-9">
                        {
                            (this.state.activeTab === 'addresses') ?
                                <Addresses deleteSpecificAddress={address => this.deleteAddress(address)} addresses={this.state.addresses}/>
                                :(this.state.activeTab === 'orders') ?
                                        <Orders orders={this.state.orders}/>
                                        :<General/>
                        }
                    </div>
                </div>
            </div>
        );
    }


}

export default UserProfile;
