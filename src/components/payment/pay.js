/**
 * Created by su on 6/27/17.
 */
import React from "react"
import ReactDOM from "react-dom"
import Paypal from "paypal-checkout"
import axios from "axios"
import http from "../../util/http"
import {connect} from "react-redux"
import {Row, Col, Radio, Checkbox} from "react-bootstrap"
import {updateShipmentLabel, getShipmentInfo} from "../../actions/shipmentAction"


const ReactButton = Paypal.Button.driver('react', {React, ReactDOM});
const paypalPngPath = require("../../image/paypal.png");

@connect((store) => {
    return {
        shipment: store.shipment,
    }
})
export default class Pay extends React.Component{
    constructor(props){
        super(props);
        this.client = {
            sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: '<insert production client id>'
        }
        this.shipmentId = props.match.params["ship_id"];
        this.style = {
            color: 'blue',
            shape: 'pill',
            label: 'pay'
        };
    }

    payment(data, actions){
        return axios.post(http.urlFormat(http.url.PAYMENT_CREATE_PAYMENT.url,this.shipmentId),{}).then(function(res){
             return res.data.data['payment_id'];
        });
    }

    componentWillMount() {
        this.props.dispatch(getShipmentInfo(this.shipmentId));
    }

    onAuthorize(data, actions){
        var data = {
            payment_id: data.paymentID,
            payer_id: data.payerID
        };

        let self = this;
        return axios.post(http.urlFormat(http.url.PAYMENT_EXECUTE.url,this.shipmentId),data).then(function(res){
            self.props.dispatch(updateShipmentLabel(res.data.data))
            self.props.history.push("/shipment/label/" + self.shipmentId);
        });


    }


    render(){
        let shipment = this.props.shipment;

        let rate = {};
        shipment['rates'].forEach(function(item){
           if(item['id'] == shipment['picked_rate_id']){
               rate = item;
           }
        });

        return(
            <div>

            <Row>
            <Col xs={12}>
                <h4 className='mt-30 mb-10'>Summary</h4>

                <div className="grey-box striped">
                <Row>
                <Col xs={6} sm={3}>
                <div className='mb-5'>Shipping Fee</div>
                    <b>$ { parseFloat(rate['rate']).toFixed(2) }</b>
                </Col>

                <Col xs={6} sm={3}>
                <div className='mb-5'>Insurance Permium</div>
                    <b>$ { parseFloat(shipment['insurance_premium']).toFixed(2) }</b>
                </Col>


                <Col xs={6} sm={3}>
                <div className='mb-5'>Platform Fee</div>
                <b>$ { parseFloat(shipment['platform_fee']).toFixed(2) }</b>
                </Col>


                <Col xs={6} sm={3}>
                <div>
                    <div className='mb-5'>Tax</div>
                    <b>$ { parseFloat(shipment['tax']).toFixed(2) }</b>
                </div>
                </Col>

                </Row>
                </div>

                <div className="white-box bb">
                <Radio name="yo" checked={true}>
                    <span className='radio-label'>
                    <img src={paypalPngPath} className='ml-10'/>
                    </span>
                </Radio>
                </div>
                {/*<Row>*/}
                {/*<Radio>*/}
                    {/*<img src={paypalPngPath} alt=""/>*/}
                {/*</Radio>*/}
                {/*</Row>*/}
                <div className='pull-right mt-50'>

                    <div className='pull-right mr-10 mb-5'>
                        Total: $ &nbsp;
                        <span className="emphasis">{ shipment['total'] }</span>
                    </div>
                    <ReactButton
                    client={this.client}
                    payment={this.payment.bind(this)}
                    commit={true}
                    onAuthorize={this.onAuthorize.bind(this)}
                    style={this.style}
                    env="sandbox"/>
                </div>
            </Col>
            </Row>
            </div>
        );
    }
}
