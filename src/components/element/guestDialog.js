import React from "react";

import {Button} from "react-bootstrap";
import {connect} from "react-redux"
import {showGuestDialog} from "../../actions/elementAction"


@connect((store) => {
    return {
        show:store.element.showGuestDialog,
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
        this.props.dispatch(showGuestDialog(false));
        this.props.history.push("/login");
    }

    expressCheckout(){
        this.props.dispatch(showGuestDialog(false));
    }

    register(){
        this.props.dispatch(showGuestDialog(false));
    }

    render(){
        var style = {};
        if(!this.props.show){
            style = {
                display:"none"
            }
        }

        return (<div style={style} className="guest-dialog">
            <div className="background"></div>
            <div className="panel">
                <Button className="login-btn" onClick={this.login.bind(this)} >Login</Button>
                <Button bsStyle="primary" className="express-btn" onClick={this.expressCheckout.bind(this)}>Express Checkout</Button>
                <span className="title" onClick={this.register.bind(this)} >Create Account</span>
                <span className="subtitle">or checkout without registering</span>
            </div>
        </div>);
    }
}