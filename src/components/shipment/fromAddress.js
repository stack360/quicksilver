import React from "react"
import {Button, Row, Col} from "react-bootstrap"
import {connect} from "react-redux"
import {getFromAddress,updateFromAddress} from "../../actions/shipmentAction";
import axios from "axios"
import http from "../../util/http"
import AddressForm from "../element/addressForm"
import Breadcrumb from "../element/breadcrumb"

@connect((store) => {
    return {
        from: store.shipment.from_address,
        address_validation_errors: store.shipment.address_validation_errors
    }
})
export default class FromAddress extends React.Component {

    constructor(props) {
        super(props);
        this.shipmentId = props.match.params["ship_id"];
        this.state = {errors: {}}
    }

    componentWillMount() {
        this.props.dispatch(getFromAddress(this.shipmentId));
    }

    submit(){
        let self = this;
        if (this.validatePhone() && this.validateName()) {
            axios.post(http.urlFormat(http.url.SHIPMENT_FROM_ADDRESS.url,this.shipmentId),this.props.from)
            .then(function(res){
                self.props.history.push("/shipment/to/" + self.shipmentId);
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
        if (this.props.from.phone.length != 10) {
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
        if (!this.props.from.name || (this.props.from.name.split(' ')).length <=1) {
            let new_errors = Object.assign({}, self.state.errors, {name: 'Please provide full name'});
            this.setState({errors:new_errors});
            return false;
        } else {
            let new_errors = Object.assign({}, self.state.errors, {name: null});
            this.setState({errors:new_errors});
            return true;
        }
    }


    valueChanged(val){
        this.props.dispatch(updateFromAddress(val));
    }


    render() {
        return (
            <div className="pt-20">
                <Breadcrumb shipmentId={this.shipmentId} currentStep={1}></Breadcrumb>
                <h4>Where is this shipment <b>from</b> ?</h4>
                <AddressForm  data={this.props.from} errors={this.state.errors} valueChanged={this.valueChanged.bind(this)} address_validation_errors={this.props.address_validation_errors}/>
                <div className='pull-left mt-20'>
                    <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)} >Continue</Button>
                </div>
            </div>
        );
    }
}

