import {useState} from 'react';
import {Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import './RootPage.css';

const useStyles = makeStyles({
    SortButton: {
        minWidth: 15,
        fontWeight: 'bold',
        fontSize: 18,
    },
    ActionButton: {
        background: 'linear-gradient(45deg, #F44121 30%, #FFC440 90%)',
        minWidth: 150,
        minHeight: 40,
        fontWeight: 'bold',
        borderRadius: 5,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'white'

    },
})

function RootPage(props) {
    const classes = useStyles();

    const getUsersData = () => {
        return props.data.length !== 0 ? props.data : false;
    }

    const settingEmailOrder = (value) => {
        setEmailOrder(value);
        setYearOrder(true);
        setSortCriteria({value: "email"});
    }
    const settingYearOrder = (value) => {
        setYearOrder(value);
        setEmailOrder(true);
        setSortCriteria({value: "year"});
    }

    const compareEmail = (a, b) => {
        if (a.email < b.email) return emailAsc ? -1 : 1;
        if (a.email > b.email) return emailAsc ? 1 : -1;
        return 0;
    }
    const compareYear = (a, b) => {
        if (parseInt(a.year) < parseInt(b.year)) return yearAsc ? -1 : 1;
        if (parseInt(a.year) > parseInt(b.year)) return yearAsc ? 1 : -1;
        return 0;
    }

    const getSortButton = (columnType) => {
        switch (columnType) {
            case "email":
                return emailAsc ?
                    (<Button className={classes.SortButton} onClick={() => settingEmailOrder(false)}>{'\u2193'}</Button>) :
                    (<Button className={classes.SortButton} onClick={() => settingEmailOrder(true)}>{'\u2191'}</Button>);
            case "year":
                return yearAsc ?
                    (<Button className={classes.SortButton} onClick={() => settingYearOrder(false)}>{'\u2193'}</Button>) :
                    (<Button className={classes.SortButton} onClick={() => settingYearOrder(true)}>{'\u2191'}</Button>);
            default:
                break;
        }
    }


    const [emailAsc, setEmailOrder] = useState(true);
    const [yearAsc, setYearOrder] = useState(true);
    const [sortedBy, setSortCriteria] = useState({value: ""});
    const userData = getUsersData();

    switch (sortedBy.value) {
        case "email":
            userData.sort(compareEmail);
            break;
        case "year":
            userData.sort(compareYear);
            break;
        default:
            break;
    }

    const componentShown = userData ? (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Email {getSortButton("email")}
                        </TableCell>
                        <TableCell>
                            Anul nasterii {getSortButton("year")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userData.map((row, i) =>
                            <TableRow key={i}>
                                <TableCell component={"th"} scope={"row"}>
                                    {row.email}
                                </TableCell>
                                <TableCell>
                                    {row.year}
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    ) : <div id={"EmptyMessage"}>Nu exista intrari disponibile</div>;

    const userButtonShown = localStorage.getItem("is_logged_in") && localStorage.getItem("is_logged_in") === "true" ?
        (<Button className={classes.ActionButton} onClick={() => props.history.push('/logout')}>Logout</Button>) :
        (<Button className={classes.ActionButton} onClick={() => props.history.push('/login')}>Login</Button>);

    return (
        <div className={"Root"}>
            <div id={"UsersTableContainer"}>
                {componentShown}
            </div>
            <div id={"ActionButtonContainer"}>
                {userButtonShown}
            </div>
        </div>
    );
}

export default RootPage;