import {Button, makeStyles} from "@material-ui/core";
import './LoginPage.css'
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

function LoginPage(props) {


    const onLoginClick = (event) => {
        event.preventDefault();
        localStorage.setItem("is_logged_in", "true");
        props.history.push('/form');
    }
    const classes = useStyles();
    return (
        <div className={"LoginContainer"}>
            <Button className={classes.UserButton} onClick={onLoginClick}>
                Login
            </Button>
        </div>
    );
}

export default LoginPage;