import {Button, makeStyles, TextField} from "@material-ui/core";
import './LoginPage.css'
import {useState} from "react";
import Axios from "axios";
const useStyles = makeStyles({
    UserButton: {
        background: 'linear-gradient(45deg, #F44121 30%, #FFC440 90%)',
        minWidth: 200,
        minHeight: 70,
        fontSize: 20,
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

function LoginPage(props) {

    const initialState = {value: ""};
    const [email, setEmail] = useState(initialState);
    const [password, setPassword] = useState(initialState);

    const onEmailChange = (event) => setEmail({value: event.target.value});
    const onPasswordChange = (event) => setPassword({value: event.target.value});

    const onLoginClick = (event) => {
        event.preventDefault();
        Axios({
            method: "POST",
            url: "http://localhost:9000/api/v1/users/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "email": email.value,
                "password": password.value,
            }
        }).then(res => {
            localStorage.setItem('token', res.data.response.token);
            localStorage.setItem("is_logged_in", "true");
            setTimeout(() => props.history.push('/'), 1000);
        }).catch(error => {
            if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
                throw error;
            }
        });
    }
    const classes = useStyles();
    return (
        <div className={"LoginContainer"}>
            <form className={"LoginForm"} onSubmit={onLoginClick}>
                <TextField className={"FormInput"} placeholder={"Email"} value={email.value} onChange={onEmailChange}/>
                <TextField className={"FormInput"} type={"password"} placeholder={"Password"} value={password.value} onChange={onPasswordChange}/>
                <Button className={classes.UserButton} onClick={onLoginClick}>Login</Button>
            </form>
        </div>
    );
}

export default LoginPage;