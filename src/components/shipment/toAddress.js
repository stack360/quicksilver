import React from "react"
import {Button,DropdownButton,MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {getToAddress,updateToAddress} from "../../actions/shipmentAction"
import {getAddressBook} from "../../actions/userActions"
import AddressFrom from "../element/addressForm"
import axios from  "axios"
import http from "../../util/http"
import Breadcrumb from "../element/breadcrumb"
import commonFun from "../../util/commonFun"
import validateTool from "../../util/validateTool"


@connect((store) => {
    return {
        to : store.shipment.to_address,
        addressBook: store.user.addressBook,
        token: store.element.token
    }
})
export default class ToAddress extends React.Component {

    constructor(props) {
        super(props);
        this.shipmentId = props.match.params["ship_id"];
        this.state = {errors: {}};
    }

    componentWillMount() {
        this.props.dispatch(getToAddress(this.shipmentId));
        if (this.props.token) {
            this.props.dispatch(getAddressBook());
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    valueChanged(value) {
        this.props.dispatch(updateToAddress(value));
    }

    submit(){
        let self = this;
        if (this.validatePhone() && this.validateName()) {
            // delete(this.props.to['guest']);
        axios.post(http.urlFormat(http.url.SHIPMENT_TO_ADDRESS.url,this.shipmentId),this.props.to)
             .then(function(res){
                self.props.history.push("/shipment/detail/" + self.shipmentId);
             })
             .catch((error)=>{
                 let res = error.response.data;
                 let new_errors = commonFun.parseAddressError(res);
                 let errors = Object.assign({},self.state.errors,new_errors);
                 self.setState({errors:errors});
            });
        }
    }

    validatePhone() {
        var err = [];
        if(!validateTool.validate(validateTool.type.PHONE,this.props.to.phone,err)){
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
        if(!validateTool.validate(validateTool.type.NAME,this.props.to.name,err)){
            let new_errors = Object.assign({}, self.state.errors, {name: err[0]});
            this.setState({errors:new_errors});
            return false;
        }else{
            let new_errors = Object.assign({}, self.state.errors, {name: null});
            this.setState({errors:new_errors});
            return true;
        }
    }

    addressBookSelected(idx) {
        this.props.dispatch(updateToAddress(this.props.addressBook[idx]));
    }

    render() {
        let self = this;
        var list = "";
        if (this.props.addressBook && this.props.addressBook.length > 0) {
            list = (
                <div className="mb-20">
                    <DropdownButton bsStyle="success" onSelect={this.addressBookSelected.bind(this)}
                                    id='address-list' title="addressBook">
                        {self.props.addressBook.map(function (item, index) {
                            return (<MenuItem key={index} eventKey={index}>{item['name']}</MenuItem>);
                        })
                        }
                    </DropdownButton>
                </div>
            )
        }
        return (
            <div className='pt-20'>
                <Breadcrumb shipmentId={this.shipmentId} currentStep={2}></Breadcrumb>
                <h4>Where is this shipment <b>going</b> ?</h4>
                {list}
                <AddressFrom data={this.props.to} errors={this.state.errors} valueChanged={this.valueChanged.bind(this)}/>
                <div className="pull-left mt-20">
                    <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)} >Continue</Button>
                </div>
            </div>
        );
    }
}

