import {useState, useEffect} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import './FormPage.css';
import Axios from "axios";

const useStyles = makeStyles({
    SubmitButton: {
        background: 'linear-gradient(45deg, #F44121 30%, #FFC440 90%)',
        minWidth: 200,
        minHeight: 40,
        fontWeight: 'bold',
        borderRadius: 10,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white'
    },
})

function FormPage(props) {
    useEffect(() => {
        const is_registering = localStorage.getItem("is_registering");
        if (!is_registering || is_registering === "false") {
            props.history.push("/register");
        }
    });

    const initialState = {value: ""};
    const [email, setEmail] = useState(initialState);
    const [password, setPassword] = useState(initialState);
    const [year, setYear] = useState(initialState);

    const onEmailChange = (event) => setEmail({value: event.target.value});
    const onPasswordChange = (event) => setPassword({value: event.target.value});
    const onYearChange = (event) => setYear({value: event.target.value});
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (submitValidation()) {
            Axios({
                method: "POST",
                url: "http://localhost:9000/api/v1/users/register",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    "email": email.value,
                    "password": password.value,
                    "year": year.value
                }
            }).then(res => {
                localStorage.setItem('is_registering', 'false');
                localStorage.setItem('token', res.data.response.token);
                props.history.push('/');
                return res.data.response
            }).catch(error => {
                if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
                    throw error;
                }
            });

        }
    }

    const submitValidation = () => {
        const validEmail = new RegExp('^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$');
        return validEmail.test(email.value) && year.value !== "" && parseInt(year.value) >= 0 && password.value.length > 4;
    }

    const classes = useStyles();

    return (
        <div className={"FormContainer"}>
            <form className={"RegisterForm"} onSubmit={onFormSubmit}>
                <TextField className={"FormInput"} placeholder={"Email"} value={email.value} onChange={onEmailChange}/>
                <TextField className={"FormInput"} type={"password"} placeholder={"Password"} value={password.value} onChange={onPasswordChange}/>
                <TextField className={"FormInput"} type={"number"} min={0} placeholder={"Anul nasterii"} value={year.value} onChange={onYearChange}/>
                <Button className={classes.SubmitButton} disabled={!submitValidation()} onClick={onFormSubmit}>Submit</Button>
            </form>
        </div>
    );
}

export default FormPage;