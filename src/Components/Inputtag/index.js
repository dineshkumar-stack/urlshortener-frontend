import React from 'react'

function Inputtag({ name, type, placeholder, onChange, value, inputname }) {
    return (
        <div className='input'>
            <label>{name}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={inputname}/>
        </div>
    )
}

export default Inputtag