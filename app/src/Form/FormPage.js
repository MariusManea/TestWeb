import {useState, useEffect} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import './FormPage.css';

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
        const is_logged_in = localStorage.getItem("is_logged_in");
        if (!is_logged_in || is_logged_in === "false") {
            props.history.push("/login");
        }
    });

    console.log(props.handleUpdateData);
    const initialState = {value: ""};
    const [email, setEmail] = useState(initialState);
    const [year, setYear] = useState(initialState);

    const onEmailChange = (event) => setEmail({value: event.target.value});
    const onYearChange = (event) => setYear({value: event.target.value});
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (submitValidation()) {
            const data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
            data.push({"email": email.value, "year": year.value});
            localStorage.setItem("data", JSON.stringify(data));
            props.handleUpdateData();
            localStorage.setItem("data", "");
            props.history.push("/");
        }
    }

    const submitValidation = () => {
        const validEmail = new RegExp('^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$');
        return validEmail.test(email.value) && year.value !== "" && parseInt(year.value) >= 0;
    }

    const classes = useStyles();

    return (
        <div className={"FormContainer"}>
            <form className={"RegisterForm"} onSubmit={onFormSubmit}>
                <TextField className={"FormInput"} placeholder={"Email"} value={email.value} onChange={onEmailChange}/>
                <TextField className={"FormInput"} type={"number"} min={0} placeholder={"Anul nasterii"} value={year.value} onChange={onYearChange}/>
                <Button className={classes.SubmitButton} disabled={!submitValidation()} onClick={onFormSubmit}>Submit</Button>
            </form>
        </div>
    );
}

export default FormPage;