import {useState} from 'react';

function RootPage(props) {
    const getUsersData = () => {
        return props.data.length !== 0 ? props.data : false;
    }

    const settingEmailOrder = (value) => {
        setEmailOrder(value);
        setSortCriteria({value: "email"});
    }
    const settingYearOrder = (value) => {
        setYearOrder(value);
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
                    (<button className={"SortButton"} onClick={() => settingEmailOrder(false)}>A->Z</button>) :
                    (<button className={"SortButton"} onClick={() => settingEmailOrder(true)}>Z->A</button>);
            case "year":
                return yearAsc ?
                    (<button className={"SortButton"} onClick={() => settingYearOrder(false)}>0->9</button>) :
                    (<button className={"SortButton"} onClick={() => settingYearOrder(true)}>9->0</button>);
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
        <table className={"UsersTable"}>
            <thead>
            <tr>
                <th>Email {getSortButton("email")}</th>
                <th>Anul nasterii {getSortButton("year")}</th>
            </tr>
            </thead>
            <tbody>
            {userData.map((row, i) => {
                return (<tr key={i}>
                    <th>{userData[i].email}</th>
                    <th>{userData[i].year}</th>
                </tr>)
            })
            }
            </tbody>
        </table>
    ) : <div>Nu exista intrari disponibile</div>;

    const userButtonShown = localStorage.getItem("is_logged_in") && localStorage.getItem("is_logged_in") === "true" ?
        (<button className={"ActionButton"} onClick={() => props.history.push('/logout')}>Logout</button>) :
        (<button className={"ActionButton"} onClick={() => props.history.push('/login')}>Login</button>);

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