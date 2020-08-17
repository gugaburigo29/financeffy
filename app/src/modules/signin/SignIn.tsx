import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {signin} from "../auth/action";
import {Button, Card, CardContent, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    cardForm: {
        maxWidth: '350px',
        width: '100%'
    },
    title: {
        textAlign: "center"
    },
    form: {
        display: "flex",
        alignItems: "center",
        flexWrap: 'wrap',
        flexDirection: "column"
    },
    input: {
        marginBottom: theme.spacing(2)
    }
}));

export function SignIn() {
    const styles = useStyle();

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = () => dispatch(signin({
        password,
        email
    }))

    return (
        <Card className={styles.cardForm}>
            <CardContent>
                <Typography className={styles.title} gutterBottom variant="h5" component="h2">
                    Login
                </Typography>
                <form noValidate className={styles.form} autoComplete="off">
                    <TextField
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        className={styles.input}
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        className={styles.input}
                    />
                    <Button variant="contained" color="primary">
                        Entrar
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
