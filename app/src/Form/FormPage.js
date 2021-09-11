import {useState, useEffect} from "react";

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

    return (
        <div className={"Form"}>
            <form id={"RegisterForm"} onSubmit={onFormSubmit}>
                <input className={"FormInput"} placeholder={"Email"} value={email.value} onChange={onEmailChange}/>
                <input className={"FormInput"} type={"number"} min={0} placeholder={"Anul nasterii"} value={year.value} onChange={onYearChange}/>
                <button className={"SubmitButton"}>Submit</button>
            </form>
        </div>
    );
}

export default FormPage;