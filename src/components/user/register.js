import React from "react"
import {Form,FormControl,FormGroup,HelpBlock,Button} from "react-bootstrap"
import http from "../../util/http"
import axios from "axios"
import validateTool  from "../../util/validateTool"

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

        var err = [];
        if(!validateTool.validate(validateTool.type.USERNAME,this.state.username.trim(),err)){
            res = false;
            tmpValidate['username'] = err[0];
            err = [];
        }

        if(!validateTool.validate(validateTool.type.PASSWORD,this.state.pwd,err)){
            tmpValidate['pwd'] = err[0];
            res = false;
            err = []
        }

        if(this.state.pwd != this.state.confirm){
            tmpValidate['confirm'] = "Two times password not match.";
            res = false;
        }

        if( !validateTool.validate(validateTool.type.EMAIL,this.state.email,err)) {
            tmpValidate['email'] = err[0];
            res = false;
            err = [];
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

        let backUrl = this.props.match.params["backUrl"] || "/login";
        if(this.validate()){
            axios.post(http.url.REGISTER.url,data).then(function(){
                self.props.history.push(backUrl);
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