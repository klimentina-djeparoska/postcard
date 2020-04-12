import React from "react";
import "./select-postcard-type.css";

const SelectPostcardType = (props) => {

    const listItems = props.types.map((type) =>
        <div key={type.name}>
            <label key={type.name}><input type="radio" id={type.name} value={type.name} onChange={e => props.radioButtonChange(e)} checked={(props.selected === type.name)}/>  {type.name}</label>
        </div>
    );


    return (<div>
            {props.types?
                <div>
                    <SizeImage/>
                    <p className="text-middle">Choose the postcard size:</p>
                    <form>
                        {listItems}
                    </form>
                </div>
                :<Loading/>
            }
        </div>
    )
};

const SizeImage = () => {
    return (
        <div className="type large-type">
            <p className="text-middle text-white">Large 6x11</p>
            <div className="type medium-type custom-div">
                <p className="text-middle text-white">Middle 5x8</p>
                <div className="type small-type custom-div">
                    <p className="text-middle text-white">Small 4x6</p>
                </div>
            </div>
        </div>
    );
};


const Loading = () => {
    return (
        <p className="text-middle">Loading...</p>
    )
};


export default SelectPostcardType;
