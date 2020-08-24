import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import logo from "../../../assets/img/logo.png";
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../../../modules/auth/action";

const useStyles = makeStyles({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: '#13B3FF'
    },
    logo: {
        maxWidth: '100%',
        width: 100
    },
    profileGroup: {
        display: "flex",
        alignItems: "center",
        color: 'white'
    },
    profileName: {
        fontWeight: 600,
        marginRight: 15,
        fontSize: 14
    },
    profileImage: {},
    profileNamePrefix: {
        fontWeight: 500
    }
});

function Header() {
    const style = useStyles();
    const user = useSelector(selectUser);

    return (
        <header className={style.header}>
            <img src={logo} className={style.logo}/>

            {
                user && (
                    <div className={style.profileGroup}>
                        <div className={style.profileName}>
                            <span className={style.profileNamePrefix}>
                                olá, {' '}
                            </span>
                            {user.name.split(' ')[0].toLocaleLowerCase()}
                        </div>
                        <Avatar src={user.image} className={style.profileImage}/>
                    </div>
                )
            }
        </header>
    )
}

export default Header;
