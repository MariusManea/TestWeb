import {useState, useEffect} from "react";

function FormPage(props) {
    useEffect(() => {
        const is_logged_in = localStorage.getItem("is_logged_in");
        if (!is_logged_in || is_logged_in === "false") {
            props.history.push("/login");
        }
    });

    const initialState = {value: ""};
    const [email, setEmail] = useState(initialState);
    const [year, setYear] = useState(initialState);

    const onEmailChange = (event) => setEmail({value: event.target.value});
    const onYearChange = (event) => setYear({value: event.target.value});
    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
        data.push({"email": email.value, "year": year.value});
        localStorage.setItem("data", JSON.stringify(data));
        props.history.push("/");
    }

    return (
        <div className={"Form"}>
            <form id={"RegisterForm"} onSubmit={onFormSubmit}>
                <input className={"FormInput"} placeholder={"Email"} value={email.value} onChange={onEmailChange}/>
                <input className={"FormInput"} placeholder={"Anul nasterii"} value={year.value} onChange={onYearChange}/>
                <button className={"SubmitButton"}>Submit</button>
            </form>
        </div>
    );
}

export default FormPage;