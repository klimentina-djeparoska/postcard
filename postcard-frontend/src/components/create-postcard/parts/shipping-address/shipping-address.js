import React, {Component} from 'react';
import "./shipping-address.css";
import {getSavedAddressesForUser} from '../../../../repository/addressRepository';
import {saveAddressForUser} from '../../../../repository/addressRepository';
import Select from 'react-select';
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
                <input value={props.address[field.value]} disabled={props.disable} className="form-control" key={field.value} type="text" onChange={(e)=>props.onChange([field.value, e])}/>
            </div>
        </div>
    </div>
);

class ShippingAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            savedAddress: false,
            displaySaveButton: true,
            selectAddresses: [],
            disableInput: false
        };
        this.controller = new AbortController();
    }

    componentDidMount() {
        getSavedAddressesForUser(this.props.user_uid).then(res => {
            const select = [];
            for (const address of res) {
                select.push({label: address.street + ', ' + address.city + ' - ' + address.country, value: address});
            }
            this.setState({
                addresses: res,
                selectAddresses: select
            });
        })
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    onSaveAddress() {
        let isAddressSaved = false;
        const stateAddresses = this.state.addresses;
        for (const address of stateAddresses) {
            if ((address.street === this.props.address.street) && (address.city === this.props.address.city)
                && (address.country === this.props.address.country) && (address.postalCode === parseInt(this.props.address.postalCode))) {
                isAddressSaved = true;
                break;
            }
        }
        if (isAddressSaved) {
            this.setState({
                displaySaveButton: false
            });
        } else {
            const address = this.props.address;
            saveAddressForUser(this.props.user_uid, address).then(res => {
                this.setState({
                    savedAddress: true,
                    disableInput: true
                });
            });
        }

    }

    selectedAddress(e) {
        this.props.onSelectedAddress(e.value);
        this.setState({
            disableInput: true,
            displaySaveButton: false
        });
    }

    render() {
        return (
            <div>
                <p className="text-middle font-italic">Shipping address:</p>
                {
                    this.state.addresses.length?
                        <div>
                            <p>Choose from previously saved addresses: </p>
                            <Select onChange={(e => this.selectedAddress(e))} options={this.state.selectAddresses}/>
                            <p>or</p>
                        </div>:
                        <div></div>
                }
                <p className="font-italic">Please fill in the following data:</p>
                <div className="align-content-center">
                    <form className="form">
                        <FormFields address={this.props.address} disable={this.state.disableInput} onChange={(e)=> this.props.onShippingAddressChange(e)}/>
                    </form>
                </div>
                {this.state.savedAddress?
                    <div>
                        <p>Address is successfully saved</p>
                    </div>
                    :<div>
                        { this.state.displaySaveButton?
                            <div>
                                <button onClick={() => this.onSaveAddress()} className="btn btn-secondary">Save address to your addresses</button>
                            </div>:
                            <div>
                                {this.state.disableInput?
                                    <div></div>
                                    :<div>
                                        <p>Address is already saved</p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
                <div className="mt-lg-5">
                    <p className="text-middle font-italic">Price: {this.props.price} eur.</p>
                </div>
            </div>
        );
    }
}

export default ShippingAddress;
