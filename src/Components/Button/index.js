import React from 'react';


function Button({ name, type, onClick }) {
    return (
        <div>
            <button type={type} onClick={onClick}>{name}</button>
        </div>
    )
}

export default Button