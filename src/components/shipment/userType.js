import React from "react"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"



export default class UserType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                <div>please chose a user type</div>
                <Link to="/shipment/user/guest-info" ><Button  bsStyle="primary" bsSize="large" >Guest</Button></Link>
                <Button  bsStyle="primary" bsSize="large" >Login</Button>
                <Button  bsStyle="primary" bsSize="large" >Register</Button>
            </div>
        );
    }
}