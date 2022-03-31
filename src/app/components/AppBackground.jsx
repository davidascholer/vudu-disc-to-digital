import React from 'react';

import appColors from '../styles/appColors';

export default function AppBackground({ children, style }) {

    return (
        <div style={{...styles.container,...style}}>
            {children}
        </div>
    )
}

const styles = {
    container: {
        alignItems:'center',
        backgroundColor: appColors.background,
        display:'flex',
        flex:1,
        flexDirection:'column',
        height:"100vh",
        justifyContent:'flex-start',
        margin:0,
        minWidth:320,
        overflowX:'hidden',
        padding:0,
        width:"100vw",
    },
}

