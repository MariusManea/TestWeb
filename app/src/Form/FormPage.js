import {useState, useEffect} from "react";

function FormPage(props) {
    useEffect(() => {
        const is_logged_in = localStorage.getItem("is_logged_in");
        if (!is_logged_in || is_logged_in === "false") {
            props.history.push("/login");
        }
    });

    const [email, setEmail] = useState("");
    const [year, setYear] = useState(-1);

    const onEmailChange = (event) => setEmail(event.target.value);
    const onYearChange = (event) => setYear(event.target.value);
    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
        data.push({"email": email, "year": year});
        localStorage.setItem("data", JSON.stringify(data));
        props.history.push("/");
    }

    return (
        <div className={"Form"}>
            <form id={"RegisterForm"} onSubmit={onFormSubmit}>
                <input className={"FormInput"} placeholder={"Email"} value={email} onChange={onEmailChange}/>
                <input className={"FormInput"} placeholder={"Anul nasterii"} value={year} onChange={onYearChange}/>
                <button className={"SubmitButton"}>Submit</button>
            </form>
        </div>
    );
}

export default FormPage;