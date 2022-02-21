import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import Timeline from './ClientNav/Timeline';
import Dashboard from "./ClientNav/Dashboard";
import Request from "./ClientNav/Request";
import Profile from "./ClientNav/Profile";
import Default from "./ClientNav/Default";

import Home from './Home';
import Main from './Main';

import CPDForm from "./Form/CPDForm";
import CardForm from "./Form/CardForm";

import AdminMain from "./Admin/AdminMain";
import Requests from "./Admin/Requests";
import Search from "./Admin/Search";

import Permissions from "./Permissions";

export { Default, Timeline, Dashboard, Request, Profile, CPDForm, CardForm, Home, Main, AdminMain, Requests, Search, Permissions }

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
