import React from 'react';

export default function View({children}) {

    return(
        <div style={styles.container}>
            {children}
        </div>
    );
}

const styles = {
    display:'flex',
    flexDirection:'row'
};