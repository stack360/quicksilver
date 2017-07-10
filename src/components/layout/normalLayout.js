import React from "react"
import {Route, Switch,Link} from "react-router-dom"
import Home from "../unit/home"
import NotFound from "../unit/notFound"
import AboutUs from "../unit/aboutUs"
import Login from "../user/login"
import Support from "../unit/support"
import Register from "../user/register"
import AddressBook from "../user/addressBook"


const logoPath = require("../../image/logo.png");
export default class NormalLayout extends React.Component{
    render(){
        return(

            <div>
                <div className="banner">
                    <Link to={"/"}><img src={logoPath} className="logo" /></Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />



                    <Route path="/about-us" component={AboutUs}/>

                    <Route path="/support" component={Support} />

                    <Route component={NotFound}/>
                </Switch>
                <div className="page-footer">
                    Copyright Co © Ur Box Corp. All Rights Reserved.
                </div>
            </div>

        );
    }
}