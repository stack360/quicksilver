import React from "react"
import {connect} from "react-redux"
import AddressForm from "../element/addressForm"
import {Button} from "react-bootstrap"
import axios from "axios"
import http from "../../util/http"
import {addAddress,getAddressBook,updateAddress} from "../../actions/userActions"
import validateTool from "../../util/validateTool"
import commonFun from "../../util/commonFun"

@connect((store) => {
    return{
        addressBook : store.user.address_book
    }
})
export default class EditAddress extends React.Component{
    constructor(props){
        super(props);
        this.addressId = props.match.params["addressId"];
        this.state = {
            address : {
                "city": "",
                "country": "",
                "id": "",
                "name": "",
                "phone": "",
                "state": "",
                "street1": "",
                "zip": ""
            },
            errors : {
            }
        };
    }

    componentWillMount(){
        if(!!this.addressId){
            // let self = this;
            // this.props.addressBook.forEach(function(item){
            //     if(item['id'] == self.addressId){
            //         self.setState({address:item});
            //     }
            // });
            this.props.dispatch(getAddressBook());
        }
    }

    valueChanged(val){
        this.setState({address:val});
    }

    componentWillReceiveProps(props){
        let self = this;
        if(props.addressBook && this.addressId){
            props.addressBook.forEach(function(item){
                if(item['id'] == self.addressId){
                    self.setState({address:item});
                }
            })
        }
    }

    validatePhone() {
        var err = [];
        if(!validateTool.validate(validateTool.type.PHONE,this.state.address.phone,err)){
            let new_errors = Object.assign({}, self.state.errors, {phone: err[0]});
            this.setState({errors:new_errors});
            return false;
        }else{
            let new_errors = Object.assign({}, self.state.errors, {phone: null});
            this.setState({errors:new_errors});
            return true;
        }
    }

    validateName() {
        var err = [];
        if(!validateTool.validate(validateTool.type.NAME,this.state.address.name,err)){
            let new_errors = Object.assign({}, self.state.errors, {name: err[0]});
            this.setState({errors:new_errors});
            return false;
        }else{
            let new_errors = Object.assign({}, self.state.errors, {name: null});
            this.setState({errors:new_errors});
            return true;
        }
    }


    submit(){
        let self = this;
        let data = this.state.address;

        var handleErr = function(error){
            let res = error.response.data;
            let new_errors = commonFun.parseAddressError(res);
            let errors = Object.assign({},self.state.errors,new_errors);
            self.setState({errors:errors});
        }

        if(this.validateName() && this.validatePhone()) {
            if(this.addressId){
                axios.post(http.urlFormat(http.url.USER_ADDRESS_BOOL_OPERATION.url,self.addressId),data).then(function(res){
                    self.props.dispatch(updateAddress(data));
                    self.props.history.push("/user/address-book");
                }).catch(handleErr);
            }else {
                axios.post(http.url.USER_ADDRESS_BOOK.url, data).then(function (res) {
                    self.props.dispatch(addAddress(res.data.data));
                    self.props.history.push("/user/address-book");
                }).catch(handleErr);
            }
        }
    }

    cancel(){
        this.props.history.goBack();
    }

    render(){
        return (<div className="edit-address mt-20">
            <AddressForm data={this.state.address} errors={this.state.errors} valueChanged={this.valueChanged.bind(this)}  />
            <div className='mt-20'>
                <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)} >Submit</Button>
                <Button className="fl" bsStyle="primary" onClick={this.cancel.bind(this)} >Cancel</Button>
            </div>
        </div>)
    }
}