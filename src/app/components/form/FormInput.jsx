import React, { useEffect, useRef, useState } from 'react';
import { Field } from 'formik';

import appColors from '../../styles/appColors';

import cautionIcon from '../../assets/images/caution.png';
import pwShownIcon from '../../assets/images/eye_open.png';
import pwHiddenIcon from '../../assets/images/eye_closed.png';

import '../../assets/animation/placeholder_anim.css';

export default function FormInput({ name, type, placeholder, styleContainer, styleError, styleField, error, value }) {
    const [highlightStyle, setHightlightStyle] = useState(defaultStyles.inputBlur);
    const [inputIcon, setInputIcon] = useState(null);
    const [inputType, setInputType] = useState(type);
    const [errMsg, showErrMsg] = useState(false);
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);
    const [animClass, setAnimClass] = useState(null);

    const prevType = useRef("text");

    useEffect(() => {

        setPasswordIcon();

        if (touched && focused) {
            if (error) {
                setHightlightStyle(defaultStyles.inputError);
                showErrMsg(true);
                setInputIcon(cautionIcon);
            } else {
                showErrMsg(false);
                setHightlightStyle(defaultStyles.inputActive);
                setInputIcon(null);
                setPasswordIcon();
            }
        }
    })

    const setPasswordIcon = () => {
        if (type === 'password')
            setInputIcon(pwHiddenIcon)
        if (prevType.current === 'password')
            setInputIcon(pwShownIcon)
    }

    const setImageVisibility = () => {
        if (prevType.current === "text") {
            prevType.current = "password";
            setInputType("text");
            setInputIcon(pwShownIcon);
        }
        else {
            prevType.current = "text";
            setInputType("password");
            setInputIcon(pwHiddenIcon);
        }

    }
    return (
        <>
            <div style={{...defaultStyles.inputContainer,...styleContainer}}>
                <Field
                    style={{ ...defaultStyles.input, ...highlightStyle, ...styleField }}
                    name={name} type={inputType}
                    // placeholder={placeholder}
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
                <span style={defaultStyles.placeholder} className={animClass}>{placeholder}</span>
                {inputIcon &&
                    <img style={defaultStyles.image} src={inputIcon} onClick={setImageVisibility} />
                }
            </div>
            {errMsg
                ? <div style={{...defaultStyles.error,...styleError}}>{error}</div>
                : <div style={{...defaultStyles.error,...styleError}}></div>
            }
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
        height: 40,
        inset: 'none',
        left: '5%',
        padding:1,
        position: 'absolute',
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
        top: '50%',
        transform: 'translateY(-40%)',
    },
};