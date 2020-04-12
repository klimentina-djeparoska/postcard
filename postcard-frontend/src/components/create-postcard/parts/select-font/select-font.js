import React from 'react';
import './select-font.css';

const fonts = [
    {name: "Sans-Serif", value: "sans-serif"},
    {name: "Serif", value: "serif"},
    {name: "Monospace", value: "monospace"}
];

const SelectFont = (props) => {
    const listItems = fonts.map((type) =>
        <div key={type.name}>
            <label key={type.name} className={type.value}><input type="radio" id={type.name} value={type.name} onChange={e => props.radioButtonChangeFont(e)} checked={(props.selectedFont === type.value)}/>  {type.name}</label>
        </div>
    );


    return (
        <div>
            <p className="text-middle">Choose the text font family:</p>
            <form >
                {listItems}
            </form>
        </div>
    )
};

export default SelectFont;
