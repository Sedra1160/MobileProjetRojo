import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './App';
import Login from './login';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
//    <BrowserRouter>
//    <Switch>
//      <Route exact path="/" componet={Login} /> 
//    </Switch>
//  </BrowserRouter>,
  document.getElementById('root')
);