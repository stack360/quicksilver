import React from "react"
import {Route, Switch,Link} from "react-router-dom"
import {DropdownButton,MenuItem} from "react-bootstrap"
import Home from "../unit/home"
import NotFound from "../unit/notFound"
import AboutUs from "../unit/aboutUs"
import Login from "../user/login"
import Support from "../unit/support"
import Register from "../user/register"
import AddressBook from "../user/addressBook"
import {connect} from "react-redux"
import {getUserProfile,logout} from "../../actions/userActions"


const logoPath = require("../../image/logo.png");

@connect((store)=>{
    return {
        user: store.user.profile,
        token : store.element.token
    }
})
export default class NormalLayout extends React.Component{


    componentWillMount(){
        if(this.props.token && !this.props.user.id){
            this.props.dispatch(getUserProfile());
        }
    }

    onSelect(key){
        if(key == 1){
            this.goAddressBook();
        }else{
            this.logout();
        }
    }

    goAddressBook(){
        this.props.history.push("/user/address-book");
    }

    logout(){
        this.props.dispatch(logout());
    }

    render(){

        let userBtn = "";
        if(this.props.user.id){
            userBtn = (
                <div className="fr mt-25 mr-20">
                    <DropdownButton  onSelect={this.onSelect.bind(this)} bsStyle="primary" pullRight title={this.props.user.username} >
                        <MenuItem eventKey="1">AddressBook</MenuItem>
                        <MenuItem eventKey="2">Logout</MenuItem>
                    </DropdownButton>
                </div>
            );
        }

        return(

            <div className='page-wrapper'>
                <div className="banner">
                    <Link to={"/"}><img src={logoPath} className="logo" /></Link>
                    {/*{userBtn}*/}
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