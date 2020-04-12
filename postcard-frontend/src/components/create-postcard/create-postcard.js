import React, {Component} from "react";
import {getPostcardTypes} from '../../repository/postcardTypeRepository';
import SelectPostcardType from "./parts/select-postcard-type/select-postcard-type";
import FormikForm from "./parts/upload-photo/formik-form";
import ShippingAddress from "./parts/shipping-address/shipping-address";
import {saveOrder} from '../../repository/orderRepository';
import check from '../../assets/check.png';
import * as ROUTES from "../constants/routes";
import {Link} from "react-router-dom";
import './create-postcard.css';
import SelectFont from "./parts/select-font/select-font";
import './parts/select-font/select-font.css';

class CreatePostcard extends Component{
    constructor(props) {
        super(props);
        this.state =({
            imageSubmit: false,
            image: null,
            postcard: {
                orientation: 'vertical',
                text: '',
                font: 'sans-serif',
                postcardSize: 'Small 4x6',
            },
            address: {
                street:'',
                city: '',
                country: '',
                countryCode: ''
            },
            price: 5,
            postcardTypes: [],
            phase: 1
        });
        this.controller = new AbortController();
    }

    componentDidMount() {
        const res = getPostcardTypes();
        this.setState({
            postcardTypes: res
        });
            /*.then((types)=> {
            this.setState( {
                postcardTypes: types
            });
        }).catch(error => console.error(error.message));*/
    }

    handleRadioChange(e) {
        const value = e.target.value;
        const postcard = {
            orientation: this.state.postcard.orientation,
            text: this.state.postcard.text,
            font: this.state.postcard.font,
            postcardSize: value
        };

        this.setPrice(value);

        this.setState({
            postcard: postcard
        });
    };

    setPrice(size) {
        let value = 5;

        if (size === "Medium 5x8") {
            value = 7
        } else if (size === "Large 6x11") {
            value = 10;
        }

        this.setState({
            price: value
        });
    }


    handleImageSubmit(photoId) {
        this.setState({
            image: photoId
        });
    }

    onClick(num) {
        const next = num + 1;
        this.setState({
            phase: next
        });
    }

    changeText(e) {
        const postcard = {
            orientation: this.state.postcard.orientation,
            text: e.target.value,
            font: this.state.postcard.font,
            postcardSize: this.state.postcard.postcardSize
        };
        this.setState({
            postcard: postcard
        })
    }

    handleAddressChange(res) {
        const key = res[0];
        const value = res[1].target.value;
        switch(key) {
            case "street": {
                const address = {
                    street: value,
                    city: this.state.address.city,
                    country: this.state.address.country,
                    countryCode: this.state.address.countryCode
                };
                return this.setState({address: address});}
            case "city": {
                const address = {
                    street: this.state.address.street,
                    city: value,
                    country: this.state.address.country,
                    countryCode: this.state.address.countryCode
                };
                return this.setState({address: address});
            }
            case "country": {
                const address = {
                    street: this.state.address.street,
                    city: this.state.address.city,
                    country: value,
                    countryCode: this.state.address.countryCode
                };
                return this.setState({address: address});
            }
            case "postalCode": {
                const address = {
                    street: this.state.address.street,
                    city: this.state.address.city,
                    country: this.state.address.country,
                    countryCode: value
                };
                return this.setState({address: address});
            }
            default: return;
        }
    }

    imageSubmitCheck() {
        this.setState({
            imageSubmit: true
        })
    }

    orderFinished() {
        const address = this.state.address;

        if(parseInt(address.countryCode)) {
            if(address.street && address.city && address.country && address.countryCode) {
                const order = {
                    user_uid: this.props.user.uid,
                    postcard: this.state.postcard,
                    address: this.state.address,
                    image: this.state.image,
                    price: this.state.price
                };

                saveOrder(order).then((res)=> {
                    if(res==="success") {
                        this.setState({
                            phase: 4
                        });
                    }
                });
            } else {
                alert(
                    "Shipping address fields are mandatory!"
                );
            }
        } else {
            alert("Postal code must be a number");
        }
    }

    fontChanged(e) {
        const value = e.target.value.toLowerCase();
        const postcard = {
            orientation: this.state.postcard.orientation,
            text: this.state.postcard.text,
            font: value,
            postcardSize: this.state.postcard.postcardSize
        };
        this.setState({
            postcard: postcard
        });
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        return (
            <div className="container">
                {this.state.phase === 1?
                <div>
                    <p className="text-middle font-italic">Create your personalized postcard now!</p>
                    <p className="text-middle font-italic">Let's start with the cover image for your postcard:</p>
                    <SelectPostcardType selected={this.state.postcard.postcardSize} types={this.state.postcardTypes} radioButtonChange={(e)=> this.handleRadioChange(e)}/>
                    <FormikForm photo={this.state.image} imageSubmit={this.state.imageSubmit} onSubmit={(e)=>this.handleImageSubmit(e)} onSubmitCheck={()=> this.imageSubmitCheck()}/>
                    {this.state.image?
                    <button className="btn btn-secondary mb-lg-5 bt-continue" onClick={()=> this.onClick(1)}>Continue</button>
                        : <div></div>}
                </div>
                    : this.state.phase === 2? <div>
                        <p className="text-middle font-italic">Write your message below:</p>
                        <textarea className={this.state.postcard.font} rows="9" cols="50" onChange={e=> this.changeText(e)}></textarea>
                        <SelectFont selectedFont={this.state.postcard.font} radioButtonChangeFont={e => this.fontChanged(e)}/>
                        <p className="text-middle font-italic"> Finished with your work? <br/>Click below to complete the order</p>
                        <button className="btn btn-secondary mb-lg-5 bt-continue" onClick={()=>this.onClick(2)}>Continue</button>
                    </div>
                    : this.state.phase === 3 ?
                            <div>
                                <ShippingAddress address={this.state.address} price={this.state.price} onShippingAddressChange={(e)=> this.handleAddressChange(e)}/>
                                <p className="text-middle font-italic">Make your order now</p>
                                <button className="btn btn-secondary" onClick={()=>this.orderFinished()}>Order</button>
                            </div>
                            : <div className="mt-lg-5">
                                <img className="small-img" src={check} alt="success"/>
                                <p className="text-middle font-italic">
                                    Thank you for choosing us. <br/> Your order is received. <br/> You can check the status of the orders on your profile
                                </p>
                                <Link className="mt-lg-5" to={ROUTES.USER_PROFILE} ><button className="btn btn-secondary">My profile</button></Link>
                            </div>
                }

            </div>
        );
    }

}


export default CreatePostcard;
