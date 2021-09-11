import {Button, makeStyles} from "@material-ui/core";
import './LogoutPage.css'

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
        marginTop: '45vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white'
    },
})

function LogoutPage(props) {
    const onLogoutClick = (event) => {
        event.preventDefault();
        localStorage.setItem("is_logged_in", "false");
        props.history.push('/');
    }

    const classes = useStyles();

    return (
        <div className={"LogoutContainer"}>
            <Button className={classes.UserButton} onClick={onLogoutClick}>
                Logout
            </Button>
        </div>
    );
}

export default LogoutPage;