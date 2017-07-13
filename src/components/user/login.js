import React from "react"
import {Button,Form, FormGroup, FormControl} from "react-bootstrap"
import http from "../../util/http"
import axios from "axios"
import {updateUserProfile} from "../../actions/userActions"
import {connect} from "react-redux"
import {parse} from "querystring"



@connect((store)=>{
    return{}
})
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            error: null
        }


    }

    submit(){
        let self = this;
        var data = {
            "username": this.state.username,
            "password":this.state.pwd
        };

        let parsed = parse(this.props.location.search.substring(1));

        let backUrl = parsed["backUrl"] || "/user/address-book";

        axios.post(http.url.LOGIN.url,data).then(function(res){
            self.props.dispatch(updateUserProfile(res.data.data));
            self.props.history.push(backUrl);
        },function (error){
            self.setState({error : "Invalid  username/password"});
        })
    }

    onChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }


    render() {
        let errorNode = null;
        let state = "";
        if(this.state.error != null){
            errorNode = (<div className="mb-10 align-center"> <span className="error"> {this.state.error} </span> </div>)
            state = "error";
        }
        return (
            <div className="container login">
                <div className="wrapper">
                    <div className="title">
                        <span> Login</span>
                    </div>
                    <Form >
                        <FormGroup controlId="name" validationState={state}>
                            <FormControl name="username" type="txt" placeholder="Email"  onChange={this.onChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup controlId="pwd" validationState={state}>
                            <FormControl name="pwd" type="password" placeholder="Password" onChange={this.onChange.bind(this)}/>
                        </FormGroup>
                    </Form>
                    {errorNode}
                    <Button bsStyle="success" onClick={this.submit.bind(this)} block>Login</Button>
                </div>

            </div>
        );
    }
}