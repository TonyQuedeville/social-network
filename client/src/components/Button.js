import React from 'react';
import '../styles/Button.css'

function Button(props) {
    const { onClick, text, disabled } = props;

    return (
        <button className="common-button-style" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;