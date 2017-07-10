import React from "react"
import ReactDOM from "react-dom"
import store from "./store"
import { Provider } from "react-redux"
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import ContainerLayout from "./components/layout/containerLayout"
import NormalLayout from "./components/layout/normalLayout"

import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { createHashHistory } from 'history'

import  './sass/main.scss'

const app = document.getElementById("react");




ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={NormalLayout} />
                <Route path="/shipment" component={ContainerLayout} />
                <Route path="/payment" component={ContainerLayout} />
                <Route path="/user" component={ContainerLayout} />
                <Route component={NormalLayout} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    app);