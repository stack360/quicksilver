import React from "react"
import {Button,Row,Col} from "react-bootstrap"
import {connect} from "react-redux"
import axios from "axios"
import http from "../../util/http"
import {startShip} from "../../actions/shipmentAction"


const iconPath1 = require("../../image/icon1.png");
const iconPath2 = require("../../image/icon2.png");
const iconPath3 = require("../../image/icon3.png");
const fedex = require("../../image/fedex.png");
const ups = require("../../image/ups.png");
const usps = require("../../image/usps.png");


@connect((store) => {
    return {
        shipment: store.shipment,
    }
})
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }

    startShipment(){
        let self = this;
        axios.post(http.url.SHIPMENT_START.url).then(function (res) {
            let shipmentId = res.data.data['shipment_id'];
            self.props.dispatch(startShip(shipmentId));
            self.props.history.push("/shipment/from/" + shipmentId);
        });
    }

    render(){
        return(
            <div className="home">
                <div className="ship">
                    <div className="background"></div>
                    <div className="ship-content">
                        <span className="title">Better, Faster and </span>
                        <span className="title"> Cheaper Shipping </span>
                        <span className="sub-title"> We pick up package,</span>
                        <span className="sub-title"> and ship you items for the lowest price.</span>
                        <Button bsStyle="success" className="shipment-button" onClick={this.startShipment.bind(this)}>Create a shipment</Button>
                    </div>
                </div>
                <div className="container">
                    <div className="section">
                        <span className="section-title">How to Ship</span>
                        <Row>
                            <Col xs={4} >
                                <div className="item">
                                    <div className="image-frame">
                                        <img src={iconPath1} />
                                    </div>
                                    <span className="title">Create</span>
                                    <span className="sub-title">Enter the unique pickup</span>
                                    <span className="sub-title">code</span>
                                </div>
                            </Col>
                            <Col xs={4} >
                                <div className="item">
                                    <div className="image-frame">
                                        <img src={iconPath2} />
                                    </div>
                                    <span className="title">ShipLocker</span>
                                    <span className="sub-title">Enter the unique pickup</span>
                                    <span className="sub-title">code</span>
                                </div>
                            </Col>

                            <Col xs={4} >
                                <div className="item">
                                    <div className="image-frame">
                                        <img src={iconPath3} />
                                    </div>
                                    <span className="title">Delivery</span>
                                    <span className="sub-title">Enter the unique pickup</span>
                                    <span className="sub-title">code</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="section">
                        <span className="section-title">Our Partner</span>
                        <Row>
                            <Col xs={4}>
                                <img src={usps} />
                            </Col>
                            <Col xs={4}>
                                <img src={ups} />
                            </Col>
                            <Col xs={4}>
                                <img src={fedex} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}