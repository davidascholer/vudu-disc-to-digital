import React, { useState } from 'react';

import appColors from '../styles/appColors';

export default function AppBackgroundWScrollListener({ children, listener, style }) {
    const [enableScroll, setEnableScroll] = useState(true);

    //Set a time to delay the beg/end listener to give the UI time to rerender.
    const RENDER_DELAY = 1000;

    const handleScroll = async (pos) => {

        if (enableScroll) {
            const { scrollTop, offsetHeight, scrollHeight } = pos;


            if (scrollTop === 0) {
                    const scroller = document.getElementById('scroll-container');
                    if (scroller.scrollTop === 0) {
                        setEnableScroll(false);
                        const scroll = await listener('beg');
                        if (scroll) {
                            scrollToBottom(scrollHeight - offsetHeight);
                            setTimeout(() => {
                                setEnableScroll(true);
                            }, RENDER_DELAY);
                        }
                    }
            }

            if (offsetHeight + scrollTop + 1 > scrollHeight) {
                    const scroller = document.getElementById('scroll-container');
                    if (scroller.offsetHeight + scroller.scrollTop + 1 > scroller.scrollHeight) {
                        setEnableScroll(false);
                        const scroll = await listener('end');
                        if (scroll) {
                            scrollToTop();
                            setTimeout(() => {
                                setEnableScroll(true);
                            }, RENDER_DELAY);
                        }
                    }
            }
        }
    }

    const scrollToTop = () => {
        document.getElementById('scroll-container').scroll({ top: 0, behavior: 'instant' })
    };

    const scrollToBottom = pos => {
        document.getElementById('scroll-container').scroll({ top: pos, behavior: 'instant' })
    };

    return (
        <div id="scroll-container" style={{ ...styles.container, ...style }}
            onScroll={e => handleScroll(e.target)}
        >
            {children}
        </div>
    )
}

const styles = {
    container: {
        alignItems: 'center',
        backgroundColor: appColors.background,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: "100vh",
        justifyContent: 'flex-start',
        margin: 0,
        overflowX: 'hidden',
        padding: 0,
        width: "100vw",
    },
}

