import './App.css';

import LoginPage from './Login/LoginPage';
import FormPage from "./Form/FormPage";
import LogoutPage from "./Logout/LogoutPage";
import RootPage from "./Root/RootPage";

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {connect} from "react-redux";

function App() {

    const Component = ({data}) =>
        <div className="App">
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route path={'/login'} component={LoginPage}/>
                    <Route path={'/form'} component={FormPage}/>
                    <Route path={'/logout'} component={LogoutPage}/>
                    <Route path={'/'} component={() => <RootPage data={data}/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    const mapStateToProps = state => {
        return {
            data: state
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
            handleIncrementClick: () => dispatch({type: 'INCREMENT'}),
            handleDecrementClick: () => dispatch({type: 'DECREMENT'})
        }
    };
    const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
    return (
        <Container/>
    );
}

export default App;
