/**
 * Created by su on 6/7/17.
 */

import React from "react";
import {connect} from "react-redux"
import {fetchUser} from "../../actions/userActions"
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
import { Row, Col,DropdownButton,MenuItem} from "react-bootstrap"
import AddressBook from "../user/addressBook"
import NotFound from "../unit/notFound"
import EditAddress from "../user/editAddress"
import {getUserProfile,logout} from "../../actions/userActions"


const logoPath = require("../../image/logo.png");

@connect((store) => {
    return {
        user: store.user.profile,
        token : store.element.token
    }
})
export default class ContainerLayout extends React.Component {

    constructor(props) {
        super(props);

    }


    componentWillMount(){
        if(this.props.token && !this.props.user.id){
            this.props.dispatch(getUserProfile());
        }
    }

    onSelect(key){
        if(key == 1){
            this.goAddressBook();
        }else{
            this.logout();
        }
    }

    goAddressBook(){
        this.props.history.push("/user/address-book");
    }

    logout(){
        this.props.dispatch(logout());
        this.props.history.push("/");
    }


    render() {

        let userBtn = "";
        if(this.props.user.id){
            userBtn = (
                <div className="fr mt-25 mr-20">
                    <DropdownButton  onSelect={this.onSelect.bind(this)} bsStyle="primary" pullRight title={this.props.user.username} >
                        <MenuItem eventKey="1">AddressBook</MenuItem>
                        <MenuItem eventKey="2">Logout</MenuItem>
                    </DropdownButton>
                </div>
            );
        }

        return (
            <div className='page-wrapper'>
                <div className="container-banner">
                    <Link to={"/"}> <img src={logoPath} className="logo" /></Link>
                    {userBtn}
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

