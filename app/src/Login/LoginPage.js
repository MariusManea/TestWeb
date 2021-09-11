function LoginPage(props) {
    const onLoginClick = (event) => {
        event.preventDefault();
        localStorage.setItem("is_logged_in", "true");
        props.history.push('/form');
    }
    return (
        <div className={"Login"}>
            <button className={"UserButton"} onClick={onLoginClick}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;