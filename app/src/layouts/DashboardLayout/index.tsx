import React from "react";
import Header from "./components/Header";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    content: {
        backgroundColor: '#F6F6F6',
        height: '100vh',
        maxHeight: 70
    },
    container: {
        marginTop: 30,
        maxWidth: '950px',
        margin: "0 auto",
    }
});

const DashboardLayout: React.FC = ({children}) => {
    const style = useStyles();

    return (
        <div className={style.content}>
            <Header/>
            <div className={style.container}>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;
