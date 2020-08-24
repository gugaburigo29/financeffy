import React from "react";
import {AnimatePresence} from "framer-motion";
import {makeStyles} from "@material-ui/core/styles";
import logo from '../assets/img/logo.png';
import icon from '../assets/img/icon.svg';

interface SignLayoutProps {
    children: JSX.Element
}

const useStyle = makeStyles({
    container: {
        backgroundColor: '#13B3FF',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    containerContent: {
        maxWidth: 1100,
        display: 'grid',
        gridTemplateAreas: `
            'logo icon icon'
            'form icon icon'
        `,
        margin: '0 auto',
        gridGap: 20
    },
    logo: {
        gridArea: 'logo',
    },
    icon: {
        gridArea: 'icon'
    },
    form: {
        gridArea: 'form'
    },
    description: {
        fontFamily: 'Poppins',
        color: '#D8F2FF',
        margin: 0,
        maxWidth: 230
    },
});

export function SignLayout({children}: SignLayoutProps) {
    const styles = useStyle();

    return (
        <AnimatePresence exitBeforeEnter>
            <div className={styles.container}>
                <div className={styles.containerContent}>
                    <div className={styles.logo}>
                        <img src={logo} alt="Logo"/>
                        <p className={styles.description}>Livre-se das planilhas e da papelada.</p>
                    </div>
                    <div className={styles.icon}>
                        <img src={icon} alt="Icon"/>
                    </div>
                    <div className={styles.form}>
                        {children}
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}
