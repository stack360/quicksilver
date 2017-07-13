import React from "react"
import {Button, Row, Col, DropdownButton, MenuItem} from "react-bootstrap"
import {connect} from "react-redux"
import {getFromAddress, updateFromAddress} from "../../actions/shipmentAction";
import {getAddressBook} from "../../actions/userActions"
import axios from "axios"
import http from "../../util/http"
import AddressForm from "../element/addressForm"
import Breadcrumb from "../element/breadcrumb"
import validateTool  from "../../util/validateTool"
import commonFun from "../../util/commonFun"

@connect((store) => {
    return {
        from: store.shipment.from_address,
        addressBook: store.user.addressBook,
        token: store.element.token
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
        if (this.props.token) {
            this.props.dispatch(getAddressBook());
        }
    }

    submit() {
        let self = this;
        if (this.validatePhone() && this.validateName()) {
            axios.post(http.urlFormat(http.url.SHIPMENT_FROM_ADDRESS.url, this.shipmentId), this.props.from)
                .then(function (res) {
                    self.props.history.push("/shipment/to/" + self.shipmentId);
                })
                .catch((error) => {
                    let res = error.response.data;
                    let new_errors = commonFun.parseAddressError(res);
                    let errors = Object.assign({}, self.state.errors, new_errors);
                    self.setState({errors: errors});
                });
        }
    }

    validatePhone() {
        var err = [];
        if (!validateTool.validate(validateTool.type.PHONE, this.props.from.phone, err)) {
            let new_errors = Object.assign({}, self.state.errors, {phone: err[0]});
            this.setState({errors: new_errors});
            return false;
        } else {
            let new_errors = Object.assign({}, self.state.errors, {phone: null});
            this.setState({errors: new_errors});
            return true;
        }
    }

    validateName() {
        var err = [];
        if (!validateTool.validate(validateTool.type.NAME, this.props.from.name, err)) {
            let new_errors = Object.assign({}, self.state.errors, {name: err[0]});
            this.setState({errors: new_errors});
            return false;
        } else {
            let new_errors = Object.assign({}, self.state.errors, {name: null});
            this.setState({errors: new_errors});
            return true;
        }
    }


    valueChanged(val) {
        this.props.dispatch(updateFromAddress(val));
    }

    addressBookSelected(idx) {
        this.props.dispatch(updateFromAddress(this.props.addressBook[idx]));
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
            <div className="pt-20">

                <Breadcrumb shipmentId={this.shipmentId} currentStep={1}></Breadcrumb>
                <h4>Where is this shipment <b>from</b> ?</h4>
                {list}
                <AddressForm data={this.props.from} errors={this.state.errors}
                             valueChanged={this.valueChanged.bind(this)}/>
                <div className='pull-left mt-20'>
                    <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)}>Continue</Button>
                </div>
            </div>
        );
    }
}

