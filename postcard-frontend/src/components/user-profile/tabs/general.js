import {Link} from "react-router-dom";
import React from "react";

const General = () => {
    return (
        <div className="mt-custom">
            <p className="text-middle">
                Create a new personalized postcard <br/>
                To share and celebrate good things in life, together with your people
            </p>
            <Link to={'/create-postcard'} className="mb-lg-5"><button className="btn btn-info create-btn bt-continue">Create postcard</button></Link>
        </div>
    );
};

export default General;
