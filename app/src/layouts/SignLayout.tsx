import React from "react";
import {AnimatePresence} from "framer-motion";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import background from '../assets/img/background.jpeg'

interface SignLayoutProps {
    children: JSX.Element
}

const useStyle = makeStyles({
    container: {
        backgroundColor: '#13B3FF',
        height: '100vh',
    },
    containerContent: {
        maxWidth: 1100,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    rightColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    leftColumn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover"
    },
});

export function SignLayout({children}: SignLayoutProps) {
    const styles = useStyle();

    return (
        <AnimatePresence exitBeforeEnter>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                </div>
                <div className={styles.rightColumn}>
                    {children}
                </div>
            </div>
        </AnimatePresence>
    )
}
