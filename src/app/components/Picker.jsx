import React, { useState } from 'react';

export default function Picker({ onClick, openState, style }) {

    const [open, setOpen] = useState(openState);

    const handleOnClick = () => {
        setOpen(!open);
        onClick();
    }

    return (
        <div style={style} onClick={handleOnClick}>
            <span style={styles.text}>Filter</span>
            {open &&
                <span style={styles.arrowDown} />
            }
            {!open &&
                <span style={styles.arrowUp} />
            }
        </div>
    );
}

const styles = {
    arrowDown: {
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderTop: '12px solid black',
    },
    arrowUp: {
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderBottom: '12px solid black',
    },
    text: {
        color: '#fff',
        fontWeight: 400,
        letterSpacing: 1,
        pointerEvents: 'none',
    },
};