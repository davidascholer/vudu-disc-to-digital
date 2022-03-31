import React from 'react';

import appStyles from '../../styles/appStyles';

export default function Button({ style, buttonTextStyles, onClick, title, type = "submit", disabled = false}) {

    return (
        <>
            {!disabled &&
                <button type={type} style={{ ...defaultStyles.button, ...style }} onClick={onClick}>
                    <span style={{ ...defaultStyles.buttonText, ...buttonTextStyles }}>{title}</span>
                </button>
            }
            {disabled &&
                <button type={type} style={{ ...defaultStyles.button,...defaultStyles.buttonDisabled,...style }}>
                    <span style={{ ...defaultStyles.buttonText,...defaultStyles.buttonText, ...buttonTextStyles }}>{title}</span>
                </button>
            }
        </>
    );
}

const defaultStyles = {
    button: {
        alignItems: 'center',
        backgroundColor: '#027BC3',
        borderRadius: 4,
        cursor:'pointer',
        display: 'block',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: '2%',
        minHeight:40,
        width: '96%',
        height: 40,
    },
    buttonDisabled: {
        backgroundColor: '#999',
        borderStyle: 'outset',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: "500",
        fontSize: 20,
        color: '#fff'
    },
}