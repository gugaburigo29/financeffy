import React, {MouseEvent, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {signup} from "../auth/action";
import {makeStyles} from "@material-ui/core/styles";
import {motion, Variants} from "framer-motion";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import {useDropzone} from "react-dropzone";
import {useHistory} from "react-router-dom";

enum FormSteps {
    FIRST,
    LAST
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
    },
    cpfGroup: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr"
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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

export function SignUp() {
    const styles = useStyle();

    const dispatch = useDispatch();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<FormSteps | null>(null);
    const [image, setImage] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [dateNasciment, setDateNasciment] = useState<string>('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            setImage(String(fileReader.result));
        }
        fileReader.readAsDataURL(file);
    }, [setImage])
    const {getInputProps, inputRef} = useDropzone({onDrop, accept: 'image/*'});

    const handleClickAvatar = () => {
        const element = inputRef.current;

        if (element) {
            element.click();
        }
    };

    const nextStep = async (event: MouseEvent) => {
        event.preventDefault();

        if (!step) {
            setStep(FormSteps.FIRST);
        }

        if (step == FormSteps.FIRST) {
            setStep(FormSteps.LAST);
        }

        if (step == FormSteps.LAST) {
            await dispatch(signup({
                email,
                password,
                name,
                cpf,
                dataNascimento: dateNasciment,
                image
            }));

            history.push('/dashboard')
        }
    }

    const firstStep = () => (
        <MotionDiv
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
        >
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
        </MotionDiv>
    )

    const lastStep = () => (
        <MotionDiv
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <MotionDiv
                variants={variant}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.cpfGroup}
            >
                <div className={styles.avatar}>
                    <input type="file" {...getInputProps()}/>
                    <Avatar onClick={handleClickAvatar} src={image}/>
                </div>
                <div className={styles.inputBlock}>
                    <label className={styles.label}>CPF</label>
                    <input
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        className={styles.input}
                    />
                </div>
            </MotionDiv>
            <MotionDiv
                variants={variant}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.inputBlock}
            >
                <label className={styles.label}>Nome</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={styles.input}
                />
            </MotionDiv>
            <MotionDiv
                variants={variant}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.inputBlock}
            >
                <label className={styles.label}>Data Nascimento</label>
                <input
                    type="date"
                    value={dateNasciment}
                    onChange={e => setDateNasciment(e.target.value)}
                    className={styles.input}
                />
            </MotionDiv>
        </MotionDiv>
    )

    return (
        <form className={styles.form}>
            {step == FormSteps.FIRST && (
                firstStep()
            )}
            {step == FormSteps.LAST && (
                lastStep()
            )}
            <div className={styles.btnGroup}>
                <Link
                    to="/"
                    className={styles.btnPrimary}
                >
                    Login
                </Link>
                <button
                    onClick={nextStep}
                    className={styles.btnSecondary}
                >
                    Cadastre-se
                </button>
            </div>
        </form>
    )
}
