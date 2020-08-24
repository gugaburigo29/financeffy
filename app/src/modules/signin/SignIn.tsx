import React, {MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {signin} from "../auth/action";
import {makeStyles} from "@material-ui/core/styles";
import {motion, Variants} from "framer-motion";
import {Link, useHistory} from "react-router-dom";

enum FormSteps {
    EMAIL,
    SENHA
}

const useStyle = makeStyles((theme) => ({
    input: {
        marginBottom: theme.spacing(2),
        height: 40,
        backgroundColor: '#EFEFEF',
        border: 'none',
        borderRadius: 5,
        padding: '5px 15px'
    },
    inputBlock: {
        display: 'flex',
        flexDirection: 'column',
        overflow: "hidden"
    },
    label: {
        color: 'white',
        marginBottom: 5,
        fontFamily: 'Archivo',
        fontWeight: 500,
        fontSize: 13
    },
    form: {
        marginBottom: theme.spacing(2),
    },
    btnGroup: {
        display: "grid",
        gridTemplateColumns: '1fr 1fr',
        gridGap: 15
    },
    btnPrimary: {
        backgroundColor: '#5FCBFE',
        border: 'none',
        padding: 20,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: 600,
        borderRadius: 5,
        cursor: 'pointer',
        textDecoration: "none",
        textAlign: "center",
        fontSize: 14
    },
    btnSecondary: {
        backgroundColor: '#05D964',
        border: 'none',
        padding: 20,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: 600,
        borderRadius: 5,
        cursor: 'pointer',
        textDecoration: "none",
        textAlign: "center",
        fontSize: 14
    }
}));

const variant: Variants = {
    initial: {
        translateX: -10,
        opacity: 0,
        maxHeight: 0
    },
    animate: {
        translateX: 0,
        opacity: 1,
        maxHeight: 1000
    },
    exit: {
        translateX: 10,
        opacity: 0,
        maxHeight: 0
    },
}

const {div: MotionDiv} = motion;

export function SignIn() {
    const styles = useStyle();

    const dispatch = useDispatch();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<FormSteps | null>(null);

    const nextStep = async (event: MouseEvent) => {
        event.preventDefault();

        if (!step) {
            setStep(FormSteps.EMAIL);
        }

        if (step == FormSteps.EMAIL) {
            setStep(FormSteps.SENHA);
        }

        if (step == FormSteps.SENHA) {
            await dispatch(signin({
                password,
                email
            }))

            history.push('/dashboard')
        }
    }

    const showInputEmail = () => step == FormSteps.SENHA || step == FormSteps.EMAIL;

    return (
        <form className={styles.form}>
            {
                showInputEmail() && (
                    <MotionDiv
                        variants={variant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={styles.inputBlock}
                    >
                        <label className={styles.label}>E-mail</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </MotionDiv>
                )
            }
            {
                step == FormSteps.SENHA && (
                    <MotionDiv
                        variants={variant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={styles.inputBlock}
                    >
                        <label className={styles.label}>Senha</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </MotionDiv>
                )
            }
            <div className={styles.btnGroup}>
                <button
                    onClick={nextStep}
                    className={styles.btnPrimary}
                >
                    Login
                </button>
                <Link
                    to="/signup"
                    className={styles.btnSecondary}
                >
                    Cadastre-se
                </Link>
            </div>
        </form>
    )
}
