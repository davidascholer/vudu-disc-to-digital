
import React, { useContext, useEffect, useState } from 'react';

import { FILTER_LIST } from '../config/constants';

import '../styles/styles.css';

export default function FilterDialogue({ onPress, style }) {


    const FilterTextHeader = ({ item }) => (
        <div style={{...styles.textContainer,...{position:'sticky'}}}>
            <span style={{...styles.text,...styles.header}}>{item}</span>
        </div>
    );
    const FilterText = ({ item, parent }) => (
        <div style={styles.textContainer} onClick={()=>onPress(item, parent)}>
            <span style={styles.text}>{item}</span>
        </div>
    );

    return (
        <div style={{ ...styles.container, ...style }}>
            {
                Object.keys(FILTER_LIST).map((category, index) => (
                    <div key={index} style={styles.view} className='no-scrollbar'>
                        <FilterTextHeader item={category}/>
                            {
                                FILTER_LIST[category].map((item, index) => (
                                    <FilterText key={item} item={item} parent={category}/>
                                ))
                            }
                    </div>
                ))
            }
        </div>

    );
}

const styles = {
    container: {
        backgroundColor:'blue',
        display:'flex',
        justifyContent:'space-around',
        maxHeight:400,
        width:'100%',
        height:'30vh',
    },
    header:{
        fontWeight: '700', 
    },
    text: {
        color: '#fff',
        fontSize:15,
        textAlign: 'center',
        pointerEvents:'none',
    },
    textContainer:{
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        marginBottom:15,
    },
    view:{
        overflow:'auto',
    }
}
