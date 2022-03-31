import React from 'react';

export default function MovieItem({movie, onPress}) {

    const { format, genres, image, ratings, title, year } = movie;


    return (
        <>
        <div style={styles.container} onClick={()=>onPress(movie)}>
            <img style={styles.image} src={image} alt={title} />
            <div style={styles.textContainer}>

                <div style={styles.horizontalView}>
                    <h1 style={{...styles.text, ...styles.titleContainer}}>{title}</h1>
                </div>
                <div style={styles.horizontalView}>
                    <h2 style={styles.text}>{year}</h2>
                    <h2 style={styles.text}>{ratings}</h2>
                    <h2 style={styles.text}>{format}</h2>
                </div>
                <div style={styles.horizontalView}>
                    <h2 style={styles.text}>{genres}</h2>
                </div>
            </div>
        </div >
        <hr style={styles.hr}></hr>
        </>
    );
}

const styles = {
    border: {
        borderBottomWidth: 1,
        borderColor: '#007aff',
    },
    container: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    horizontalView: {
        alignItems:'center',
        display:'flex',
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
    },
    hr: {
        borderColor: '#aaa',
        display: 'block',
        opacity: '.5',
        width: '95%',
    },
    image: {
        marginLeft:10,
        maxHeight:200,
        objectFit: 'contain',
        width: '20%',  
      },
    text: {
        color: '#fff',
        fontSize:16,
        fontWeight:300,
        pointerEvents:'none',
        textAlign: "center",
    },
    textContainer: {
        display:'flex',
        flex: 3,
        flexDirection:'column',
    },
    titleContainer: {
        fontSize:20,
        fontWeight:400,

    },
};