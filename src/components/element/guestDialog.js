import React from "react";

import {Button} from "react-bootstrap";
import {connect} from "react-redux"
import {hideGuestDialog} from "../../actions/elementAction"


@connect((store) => {
    return {
        info:store.element.gustDialogInfo,
    }
})
export default class GuestDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount(){
        // this.props.dispatch(showGuestDialog(true));
    }

    login(){
        this.props.dispatch(hideGuestDialog());
        if(this.props.info.loginCallback){
            this.props.info.loginCallback();
        }
    }

    expressCheckout(){
        this.props.dispatch(hideGuestDialog());
        if(this.props.info.expressCallback){
            this.props.info.expressCallback();
        }
    }

    register(){
        this.props.dispatch(hideGuestDialog());
        if(this.props.info.registerCallback){
            this.props.info.registerCallback();
        }
    }

    render(){
        var style = {};
        if(!this.props.info.show){
            style = {
                display:"none"
            }
        }

        return (<div style={style} className="guest-dialog">
            <div className="background"></div>
            <div className="panel">
                <Button className="login-btn" onClick={this.login.bind(this)} >Login</Button>
                <Button bsStyle="primary" className="express-btn" onClick={this.expressCheckout.bind(this)}>Express Checkout</Button>
                <span className="title register" onClick={this.register.bind(this)} >Create Account</span>
                <span className="subtitle">or checkout without registering</span>
            </div>
        </div>);
    }
}