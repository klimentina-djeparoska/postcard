import React, {Component} from 'react';
import SignOutButton from "../sign-out/sign-out";
import './user-profile.css';
import Orders from "./tabs/orders";
import General from "./tabs/general";
import PersonalInfo from "./tabs/personalInfo";
import {getAllOrdersForUser} from "../../repository/orderRepository";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'general',
            orders: null
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
            console.log(this.props.user);
            getAllOrdersForUser(this.props.user.uid).then(result => {
                this.setState({
                    orders: result
                })
            }).catch(error => console.error(error.message));
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 bg-column">
                        <div className="profile">
                            <img className="user-img" src={this.props.user.photoURL}/>
                            <p className="name-text">{this.props.user.displayName}</p>
                        </div>
                        {/*<div className="tab-info">
                            <button className="no-deco" onClick={()=>this.onClickHandle('personalInfo')}>Personal info</button>
                        </div>*/}
                        <div className="tab-info">
                            <button className="no-deco" onClick={()=>this.onClickHandle('orders')}>Orders</button>
                        </div>
                        <div className="tab-info">
                            <SignOutButton user={this.props.user}   signOut={()=> this.props.onUserSignOut(null)}/>
                        </div>

                    </div>
                    <div className="col-md-9">
                        {
                            (this.state.activeTab === 'personalInfo') ?
                                <PersonalInfo/>
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
