import React from 'react';

import '../assets/animation/menu_bar_anim.css';

export default function NavMenu({ initialRender, setInitialRender, shown, styles, onClick }) {

    const handleClick = () =>{
        setInitialRender(false);
        onClick();
    };

    return (
        <>
            {
                !initialRender &&
                <div style={styles.container} onClick={() => handleClick()}>
                    {shown &&
                        <>
                            <span style={styles.menuBar} className='top-bar-anim-selected' />
                            <span style={styles.menuBar} className='middle-bar-anim-selected' />
                            <span style={styles.menuBar} className='bottom-bar-anim-selected' />
                        </>
                    }
                    {!shown &&
                        <>
                            <span style={styles.menuBar} className='top-bar-anim-deselected' />
                            <span style={styles.menuBar} className='middle-bar-anim-deselected' />
                            <span style={styles.menuBar} className='bottom-bar-anim-deselected' />
                        </>
                    }
                </div>
            }
            {
                initialRender &&
                <div style={styles.container} onClick={() => handleClick()}>
                    <span style={styles.menuBar} className='top-bar-deselected' />
                    <span style={styles.menuBar} className='middle-bar-deselected' />
                    <span style={styles.menuBar} className='bottom-bar-deselected' />
                </div>
            }
        </>
    );
}

const styles = {
    container:{
        cursor:'pointer',
    },
};