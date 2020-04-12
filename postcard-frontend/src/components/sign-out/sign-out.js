import React from 'react';
import { withFirebase } from '../firebase';
import "./sign-out.css";

const SignOutButton = (props) => {

    function signOut() {
        props.firebase.doSignOut().then(()=>{
                props.signOut();

        }).catch(error => {
            console.error(error.message);
        });
    }

    return (
        <button className="btn" id={'bg-button'} type="button" onClick={() => signOut()}>
            Sign Out
        </button>
    );

};

export default withFirebase(SignOutButton);
