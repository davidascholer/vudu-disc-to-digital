import React, { useState } from 'react';

import LoadingImage from '../../assets/images/loading_64.gif';

export default function functionName({ loading }) {

    return (
        <>
            {loading &&
                <div style={styles.container}>
                    <img src={LoadingImage}></img>
                </div>
            }
        </>
    );
}

const styles = {
    container: {
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.75)',
        display:'flex',
        height: '100vh',
        justifyContent:'center',
        position: 'fixed',
        width: '100vw',
        zIndex:100
    },
};