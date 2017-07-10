import React from "react"
import {Table,Button,Row,Col,tbody} from "react-bootstrap"
import {connect} from "react-redux"
import {getShipmentInfo} from "../../actions/shipmentAction"
import axios from "axios"
import http from "../../util/http"
import Breadcrumb from "../element/breadcrumb"
import {Link} from "react-router-dom"


@connect((store) => {
    return {
        shipment: store.shipment,
    }
})
export default class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.shipmentId = props.match.params["ship_id"];
    }


    componentWillMount() {
        this.props.dispatch(getShipmentInfo(this.shipmentId));
    }


    submit(){
        let self = this;
        axios.post(http.urlFormat(http.url.SHIPMENT_CONFIRM.url,self.shipmentId),{}).then(function(res){
            self.props.history.push("/shipment/pay/" + self.shipmentId);
        })
    }

    render(){

        if(!this.props.shipment){
            return (<div></div>);
        }
        let from = this.props.shipment.from_address;
        let to = this.props.shipment.to_address;
        let shipment = this.props.shipment;

        let from_phone = '('+from.phone.substring(0,3) + ')-' + from.phone.substring(3,6) + '-' +from.phone.substring(6,10);
        let to_phone = '('+to.phone.substring(0,3) + ')-' + to.phone.substring(3,6) + '-' + to.phone.substring(6,10);
        let rate = {};
        shipment['rates'].forEach(function(item){
           if(item['id'] == shipment['picked_rate_id']){
               rate = item;
           }
        });

        return(<div className="confirm">
            <Breadcrumb shipmentId={this.shipmentId} currentStep={5}></Breadcrumb>
            <h4>
                Label info
            </h4>

            <div className="from-content mb-20">
                <Row className="border-row vertical-align" >
                    <Col xs={10} >
                        <div>
                            <span className="title">From Address</span><br/>
                            <span className='mr-10'>{from['name']}</span><span>{from_phone}</span><br/>
                            <span>{from['street1']}</span><br/>
                            <span>{from['city']}</span>,<span>{from['state']}</span> <span>{from['zip']}</span><br/>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <Link to={"/shipment/from/" + this.shipmentId}>Edit</Link>
                    </Col>

                </Row>

                <Row className="border-row vertical-align">
                    <Col xs={10} >
                        <div>
                            <span className="title">To Address</span><br/>
                            <span className='mr-10'>{to['name']}</span><span>{to_phone}</span><br/>
                            <span>{to['street1']}</span><br/>
                            <span>{to['city']}</span>,<span>{to['state']}</span> <span>{to['zip']}</span><br/>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <Link to={"/shipment/to/" + this.shipmentId}>Edit</Link>
                    </Col>
                </Row>
                <Row className="border-row vertical-align">
                    <Col xs={10} >
                        <div>
                            <span className="title">Specifications</span><br/>
                            <span>{shipment['length']} x {shipment['width']} x {shipment['height']} inches </span><br/>
                            <span>{shipment['weight']} pounds </span><br/>
                            <span>{shipment['insured'] ? "Insured value: $"+shipment['insured_value'] : "No Insurance"}</span>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <Link to={"/shipment/detail/" + this.shipmentId}>Edit</Link>
                    </Col>
                </Row>
                <Row className="border-row vertical-align">
                    <Col xs={10} >
                        <div>
                            <span className="title">Shipment Fees </span><br/>
                            <Table bordered>
                                <tbody>
                                <tr>
                                    <td>Service:  </td>
                                    <td>{rate['carrier']} {rate['est_delivery_days']} days {rate['delivery_date_guaranteed']? "Guaranteed": ""}</td>
                                </tr>
                                <tr>
                                    <td>Shipping Postage </td>
                                    <td>$ { parseFloat(rate['rate']).toFixed(2) }</td>
                                </tr>
                                <tr>
                                    <td>Insurance Premium  </td>
                                    <td>$ { parseFloat(shipment['insurance_premium']).toFixed(2) }</td>
                                </tr>
                                <tr>
                                    <td>Platform Fee </td>
                                    <td>$ { parseFloat(shipment['platform_fee']).toFixed(2) }</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td> $ { parseFloat(shipment['tax']).toFixed(2) }</td>
                                </tr>
                                </tbody>
                            </Table>

                        </div>
                    </Col>
                    <Col xs={2}>
                        <Link to={"/shipment/rate-list/" + this.shipmentId}>Edit</Link>
                    </Col>
                </Row>
            </div>



            <div className="footer">
                <div className="fr">
                    <span className="summary">Total: $ { shipment['total'] } </span>
                    <Button  bsStyle="primary" onClick={this.submit.bind(this)}>next</Button>
                </div>

            </div>
        </div>)
    }
}
