import React from "react"
import {Button} from "react-bootstrap"
import {connect} from "react-redux"
import {getToAddress,updateToAddress} from "../../actions/shipmentAction"
import AddressFrom from "../element/addressForm"
import axios from  "axios"
import http from "../../util/http"
import Breadcrumb from "../element/breadcrumb"


@connect((store) => {
    return {
        to : store.shipment.to_address
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
    }

    componentWillReceiveProps(nextProps) {
    }

    valueChanged(value) {
        this.props.dispatch(updateToAddress(value));
    }

    submit(){
        let self = this;
        if (this.validatePhone() && this.validateName()) {
        axios.post(http.urlFormat(http.url.SHIPMENT_TO_ADDRESS.url,this.shipmentId),this.props.to)
             .then(function(res){
                self.props.history.push("/shipment/detail/" + self.shipmentId);
             })
             .catch((error)=>{
                let res = error.response.data;
                if (res.code == 'ADDRESS_VALIDATION_ERROR') {
                    let new_errors = {};
                    res.validations.forEach(v=>{
                        if (['street1','city','state','zip','country', 'name', 'phone'].includes(v.field)){
                            new_errors[v.field] = v.message;
                        } else{
                            new_errors['street1'] = v.message;
                        }
                    });

                    let errors = Object.assign({},self.state.errors,new_errors);
                    self.setState({errors:errors});
                } else {

                }
            });
        }
    }

    validatePhone() {
        if (this.props.to.phone.length != 10) {
            let new_errors = Object.assign({}, self.state.errors, {phone: 'Must have 10 digits'});
            this.setState({errors:new_errors});
            return false;
        } else {
            let new_errors = Object.assign({}, self.state.errors, {phone: null});
            this.setState({errors:new_errors});
            return true;
        }
    }

    validateName() {
        if (!this.props.to.name || (this.props.to.name.split(' ')).length <=1) {
            let new_errors = Object.assign({}, self.state.errors, {name: 'Please provide full name'});
            this.setState({errors:new_errors});
            return false;
        } else {
            let new_errors = Object.assign({}, self.state.errors, {name: null});
            this.setState({errors:new_errors});
            return true;
        }
    }


    render() {

        return (
            <div className='pt-20'>
                <Breadcrumb shipmentId={this.shipmentId} currentStep={2}></Breadcrumb>
                <h4>Where is this shipment <b>going</b> ?</h4>
                <AddressFrom data={this.props.to} errors={this.state.errors} valueChanged={this.valueChanged.bind(this)}/>
                <div className="pull-left mt-20">
                    <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)} >Continue</Button>
                </div>
            </div>
        );
    }
}

