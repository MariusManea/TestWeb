import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import FormPage from "../Form/FormPage";
import LogoutPage from "../Logout/LogoutPage";
import RootPage from "../Root/RootPage";
import MoviesPage from "../Movies/MoviesPage";

export const Component = ({data, handleUpdateData, handleResetData}) =>
    <div className="App">
        <BrowserRouter basename={'/'}>
            <Switch>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/form'} render={(props) => <FormPage handleUpdateData={handleUpdateData} {...props}/>}/>
                <Route path={'/logout'} component={LogoutPage}/>
                <Route path={'/movies'} component={MoviesPage}/>
                <Route path={'/'} render={(props) => <RootPage data={data} {...props}/>}/>
            </Switch>
        </BrowserRouter>
    </div>