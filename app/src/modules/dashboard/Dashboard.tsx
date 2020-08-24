import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    grid: {
        display: "grid",
        gridTemplateAreas: `
        'cards balance'
       `,
        gridGap: 15
    },
    cards: {
        gridArea: "cards"
    },
    balance: {
        gridArea: "balance"
    },
    card: {
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
        padding: 15,
        borderRadius: 8
    },
    cardPrimary: {
        backgroundColor: '#13B3FF',
    },
    cardTitle: {
        fontFamily: 'Poppins',
        color: '#5E5E5E',
        fontSize: 13
    },
    cardTitleWhite: {
        color: 'white',
        fontFamily: 'Poppins',
        fontSize: 13
    }
});

function Dashboard() {
    const style = useStyle()

    return (
        <div className={style.grid}>
            <div className={`${style.cards} ${style.card}`}>
                <span className={style.cardTitle}>My Cards</span>
            </div>
            <div className={`${style.balance} ${style.card} ${style.cardPrimary}`}>
                <span className={`${style.cardTitle } ${style.cardTitleWhite}`}>My Balance</span>
            </div>
        </div>
    )
}

export default Dashboard;
