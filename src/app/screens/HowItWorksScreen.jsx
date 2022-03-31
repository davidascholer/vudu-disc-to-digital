import React from 'react';

import AppBackground from '../components/AppBackground';
import BackButton from '../components/common/BackButton';

export default function AboutScreen({ navigation, route }) {

    const YoutubeEmbed = ({embedId}) => (
        <div style={styles.vidContainer}>
            <iframe
                height="100%"
                width="100%"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
        );

    return (
        <AppBackground style={{ minWidth: 285 }}>
            <BackButton style={styles.backButton} />
            <YoutubeEmbed embedId={'YBjQ-HWff6A'}/>
        </AppBackground>
    );
}

const styles = {
    backButton: {
        position: 'relative',
        marginRight: 'auto',
        left: 10,
        top: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        justifyContent: 'center',
        margin: 'auto',
        paddingBottom: 100,
        width: 339,
    },
    text: {
        color: '#000',
        margin: 50,
        textAlign: 'center',
    },
    vidContainer:{
        height:'53vw',// 16/9 ratio
        marginTop:50,
        width:'95vw',
    }
}