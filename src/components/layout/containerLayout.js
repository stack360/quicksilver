/**
 * Created by su on 6/7/17.
 */

import React from "react";
import {connect} from "react-redux"
import {fetchUser} from "../../actions/userActions"
import http from "../../util/http"
import {Route, Switch,Link} from "react-router-dom"
import FromAddress from "../shipment/fromAddress"
import ToAddress from "../shipment/toAddress"
import Detail from "../shipment/detail"
import UserType from "../shipment/userType"
import ShowLabel from "../shipment/showLabel"
import GuestInfo from "../user/guestInfo"
import RateList from "../shipment/rateList"
import Confirm from "../shipment/confirm"
import Pay from "../payment/pay"
import GuestDialog from "../element/guestDialog"
import axios from "axios"
import {startShip} from "../../actions/shipmentAction"
import { Row, Col} from "react-bootstrap"
import AddressBook from "../user/addressBook"
import NotFound from "../unit/notFound"
import EditAddress from "../user/editAddress"


const logoPath = require("../../image/logo.png");

@connect((store) => {
    return {
        user: store.user.user
    }
})
export default class ContainerLayout extends React.Component {

    constructor(props) {
        super(props);

    }


    componentWillMount() {
    }


    render() {
        return (
            <div className='page-wrapper'>
                <div className="container-banner">
                    <Link to={"/"}> <img src={logoPath} className="logo" /></Link>
                </div>
                <div className="container">
                    <Row>
                        <Col md={1} lg={2}></Col>
                        <Col md={10} lg={8}>
                            <Switch>
                                <Route path="/shipment/from/:ship_id" component={FromAddress}/>
                                <Route path="/shipment/to/:ship_id" component={ToAddress}/>
                                <Route path="/shipment/detail/:ship_id" component={Detail}/>
                                <Route path="/shipment/rate-list/:ship_id" component={RateList}/>
                                <Route path="/shipment/confirm/:ship_id" component={Confirm}/>
                                <Route path="/shipment/pay/:ship_id" component={Pay}/>
                                <Route path="/shipment/label/:ship_id" component={ShowLabel}/>

                                <Route path="/user/address-book" component={AddressBook}/>
                                <Route path="/user/edit-address/:addressId?" component={EditAddress} />

                                <Route path="/shipment/user-type/:ship_id" component={UserType}/>
                                <Route path="/user/guest-info/" component={GuestInfo}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Col>
                    </Row>
                </div>
                <div className="page-footer">
                    Copyright Co © Ur Box Corp. All Rights Reserved.
                </div>
                <GuestDialog history={this.props.history}/>
            </div>

        );
    }
}

