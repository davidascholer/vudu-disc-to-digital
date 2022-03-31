import React, { useEffect, useRef, useState } from 'react';
import { Field } from 'formik';

import appColors from '../../styles/appColors';

import cautionIcon from '../../assets/images/caution.png';

import '../../assets/animation/placeholder_anim.css';

export default function FormTextArea({ name, type, placeholder, styleContainer, styleError, styleField, error, value }) {
    const [highlightStyle, setHightlightStyle] = useState(defaultStyles.inputBlur);
    const [inputIcon, setInputIcon] = useState(null);
    const [errMsg, showErrMsg] = useState(false);
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);
    const [animClass, setAnimClass] = useState(null);

    useEffect(() => {

        if (touched && focused) {
            if (error) {
                setHightlightStyle(defaultStyles.inputError);
                showErrMsg(true);
                setInputIcon(cautionIcon);
            } else {
                showErrMsg(false);
                setHightlightStyle(defaultStyles.inputActive);
                setInputIcon(null);
            }
        }
    })

    return (
        <>
            <div style={{...defaultStyles.inputContainer,...styleContainer}}>
                <Field
                    style={{ ...defaultStyles.input, ...highlightStyle, ...styleField }}
                    name={name} 
                    type={"textarea"}
                    component="textarea" 
                    // placeholder={"message"}
                    value={value}
                    onFocus={() => {
                        setFocused(true);
                        setAnimClass('input-content');
                        if (!error)
                            setHightlightStyle(defaultStyles.inputActive);
                    }}
                    onBlur={() => {
                        setTouched(true);
                        setFocused(false);
                        if (value === "")
                            setAnimClass('input-empty');
                        if (error) {
                            setHightlightStyle(defaultStyles.inputError);
                            showErrMsg(true);
                            setInputIcon(cautionIcon);
                        } else {
                            setHightlightStyle(defaultStyles.inputBlur);
                            showErrMsg(false);

                        }
                    }}
                />
            </div>
        </>
    );
}

const defaultStyles = {
    error: {
        color: 'red',
        marginBottom: 10,
        marginTop: 10,
        minHeight: 20,
        textAlign: 'center',
    },
    image: {
        filter: 'red',
        position: 'absolute',
        right: '8%',
        top: '50%',
        transform: 'translateY(-30%)',
        width: 20,
    },
    input: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 4,
        color: '#999',
        display: 'block',
        fontSize: 22,
        height: '100%',
        inset: 'none',
        left: '5%',
        padding:1,
        position: 'absolute',
        resize:'none',
        top: 0,
        width: '90%',
    },
    inputActive: {
        outline: '2px solid #3477C0',
        borderStyle: 'none',
    },
    inputBlur: {
        outline: '2px solid #555',
        borderStyle: 'none',
    },
    inputContainer: {
        display: 'block',
        position: 'relative',
        width: '100%',
        height: 40,
    },
    inputError: {
        outline: '2px solid red',
        borderStyle: 'none',
    },
    placeholder: {
        backgroundColor: appColors.background,
        borderRadius:10,
        color: '#999',
        fontSize: 20,
        fontWeight: 300,
        left: '5%',
        padding: '0 5px',
        pointerEvents:'none',
        position: 'absolute',
        top: 20,
        transform: 'translateY(-40%)',
    },
};