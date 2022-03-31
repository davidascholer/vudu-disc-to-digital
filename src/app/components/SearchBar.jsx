import React from 'react';

import searchImg from '../assets/images/searchicon.png';

export default function SearchBar({ onChange, styles }) {

    return (
        <div style={styles.searchBarContainer}>
            <img style={styles.searchBarImage} src={searchImg} />
            <input style={styles.searchBarInput} onChange={e => onChange(e.target.value)} />
        </div>
    );
}

const styles = {

};