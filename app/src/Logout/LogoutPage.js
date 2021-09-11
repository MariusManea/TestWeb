function LogoutPage(props) {
    const onLogoutClick = (event) => {
        event.preventDefault();
        localStorage.setItem("is_logged_in", "false");
        props.history.push('/');
    }

    return (
        <div className={"Logout"}>
            <button className={"UserButton"} onClick={onLogoutClick}>
                Logout
            </button>
        </div>
    );
}

export default LogoutPage;