import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import "./sign-in.css";
import login from '../../assets/login.png';

import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;


class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = { user: 'proba' };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                return socialAuthUser.user;
            })
            .then((user) => {
                this.setState({ error: null });

                this.props.onUserLogin(user);
                this.props.history.push(ROUTES.USER_PROFILE);
            })
            .catch(error => {
                console.log("errorr");
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                console.log(error);
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <div>
                <img className="login-img" src={login} alt="login-icon"/>
                <div className="align-content-center">

                    <h6 className="text-login">Login to create <br/>your <span className="font-weight-bold">personalized</span> postcard</h6>

                </div>




            <form onSubmit={this.onSubmit}>
                <button className="btn btn-dark" type="submit">Sign In with Google</button>
                {error && <p>{error.message}</p>}
            </form>
                <div className="bg-danger">
                    {this.props.user}
                </div>
            </div>

        );
    }
}

export default compose(
    withRouter,
    withFirebase
)
(SignInPage);
