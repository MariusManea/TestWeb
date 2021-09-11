import './App.css';

import LoginPage from './Login/LoginPage';
import FormPage from "./Form/FormPage";
import LogoutPage from "./Logout/LogoutPage";
import RootPage from "./Root/RootPage";

import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={'/'}>
        <Switch>
            <Route path={'/login'} component={LoginPage}/>
            <Route path={'/form'} component={FormPage}/>
            <Route path={'/logout'} component={LogoutPage}/>
            <Route path={'/'} component={RootPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
