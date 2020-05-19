import React from 'react';
import './style.css'
const OptionList = (options) => options.map(item => <option key={item.label} value={item.value}>{item.label}</option>)
const SelectBox = ({ id, name, label, options, changeHandler }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select className="form-control" name={name} id={id} onChange={changeHandler}>
                {OptionList(options)}
            </select>
        </div>
    )
}

export default SelectBox