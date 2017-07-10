import React from "react"
import {Form,FormControl,FormGroup,HelpBlock,Button} from "react-bootstrap"
import http from "../../util/http"
import axios from "axios"

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            pwd:"",
            confirm:"",
            validate:{}
        }
    }

    onChange(event){
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({[name]:value});
    }

    validate(){
        var res = true;
        var tmpValidate = {};
        if(this.state.username.trim().length < 8){
            res = false;
            tmpValidate['username'] = "The user name must have more then 8 character.";
        }

        if(this.state.pwd.length < 8){
            tmpValidate['pwd'] = "The password must have more then 8 character.";
            res = false;
        }

        if(this.state.pwd != this.state.confirm){
            tmpValidate['confirm'] = "Two times password not match.";
            res = false;
        }

        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !this.state.email.match(regex)){
            tmpValidate['email'] = "Please input correct email address."
            res = false;
        }
        this.setState({validate:tmpValidate});
        return res;
    }
    submit(){
        let self = this;

        let data = {
            "username" : this.state.username,
            "password" : this.state.pwd,
            "email" : this.state.email
        }
        if(this.validate()){
            axios.post(http.url.REGISTER.url,data).then(function(){
                self.props.history.push("/");
            });
        }
    }

    render(){
        return(
            <div className="register container">
                <div className="wrapper">
                    <div className="title">
                        <span> Register</span>
                    </div>
                    <Form >
                        <FormGroup controlId="name">
                            <FormControl name="username" type="email" placeholder="User Name"  onChange={this.onChange.bind(this)}/>
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.validate.username}</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="name">
                            <FormControl name="email" type="txt" placeholder="Email"  onChange={this.onChange.bind(this)}/>
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.validate.email}</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="pwd">
                            <FormControl name="pwd" type="password" placeholder="Password" onChange={this.onChange.bind(this)}/>
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.validate.pwd}</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="confirm">
                            <FormControl name="confirm" type="password" placeholder="Confirm Password" onChange={this.onChange.bind(this)}/>
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.validate.confirm}</HelpBlock>
                        </FormGroup>
                    </Form>
                    <Button bsStyle="success" onClick={this.submit.bind(this)} block>Submit</Button>
                </div>
            </div>
        );
    }
}