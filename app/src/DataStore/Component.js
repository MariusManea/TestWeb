import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegisterPage from "../Register/RegisterPage";
import FormPage from "../Form/FormPage";
import LogoutPage from "../Logout/LogoutPage";
import RootPage from "../Root/RootPage";
import MoviesPage from "../Movies/MoviesPage";
import LoginPage from "../Login/LoginPage";

export const Component = ({data, handleUpdateData, handleResetData}) =>
    <div className="App">
        <BrowserRouter basename={'/'}>
            <Switch>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/register'} component={RegisterPage}/>
                <Route path={'/form'} component={FormPage}/>
                <Route path={'/logout'} component={LogoutPage}/>
                <Route path={'/movies'} component={MoviesPage}/>
                <Route path={'/'} component={RootPage}/>
            </Switch>
        </BrowserRouter>
    </div>