import React from "react"
import {connect} from "react-redux"
import {Table,Row,Col,Image,Radio,Button,Checkbox} from "react-bootstrap"
import {getRates,updatePickedRateId} from "../../actions/shipmentAction"
import axios from "axios"
import http from "../../util/http"
import Breadcrumb from "../element/breadcrumb"


const fedex = require("../../image/fedex.png");
const ups = require("../../image/ups.png");
const usps = require("../../image/usps.png");


@connect((store) => {
    return {
        rates: store.shipment.rates,
        picked_rate_id: store.shipment.picked_rate_id
    }
})
export default class RateList extends React.Component {
    constructor(props) {
        super(props);
        this.shipmentId = props.match.params["ship_id"];
        this.imageMap = {
            'USPS':usps,
            'UPS':ups,
            'FEDEX':fedex
        }
        this.state = {
            filter: [false,false,false]
        }
    }

    componentWillMount() {
        this.props.dispatch(getRates(this.shipmentId));
    }

    filterFun(item,filter,flag){
        if(!filter){
            return false;
        }
        if(flag < 3){
            return item['est_delivery_days'] == flag;
        }
        return item['est_delivery_days'] >= flag;
    }


    selectRate(idx) {
        this.props.dispatch(updatePickedRateId(idx));
    }


    submit(){
        if(this.props.picked_rate_id == 0){
            return;
        }
        let rateId = this.props['picked_rate_id'];
        let self = this;
        axios.post(http.urlFormat(http.url.SHIPMENT_SAVE_RATES.url, this.shipmentId, rateId), {}).then(function (res) {
            self.props.history.push("/shipment/confirm/" + self.shipmentId);
        })
    }

    setFilter(idx){
        var filter = this.state.filter.slice(0);
        filter[idx] = ! filter[idx];
        this.setState({...this.state,filter:filter});
    }

    render() {
        let self = this;

        var showRates = this.props.rates;
        if(this.state.filter[0] || this.state.filter[1] || this.state.filter[2]){
            showRates = showRates.filter(function(item){
                return self.filterFun(item,self.state.filter[0],1) ||
                    self.filterFun(item,self.state.filter[1],2) ||
                    self.filterFun(item,self.state.filter[2],3);
            });
        }



        return (
            <div className="pt-20 rate-list">
                <Breadcrumb shipmentId={this.shipmentId} currentStep={3}></Breadcrumb>
                <h4>Your personalized estimate</h4>
                <div className="note">Select the best rate for your route, print your own labels</div>
                <div className="mt-20">
                    <Checkbox inline  checked={this.state.filter[0]} onChange={this.setFilter.bind(this,0)} >
                        <span  className="checkbox-label">Next Day</span>
                    </Checkbox>
                    <Checkbox   inline checked={this.state.filter[1]} onChange={this.setFilter.bind(this,1)}>
                        <span className="checkbox-label" > 2 Days</span>
                    </Checkbox>
                    <Checkbox inline checked={this.state.filter[2]} onChange={this.setFilter.bind(this,2)}>
                        <span className="checkbox-label"> 3 Days</span>
                    </Checkbox>
                </div>

                <div className="mt-20 mb-20">
                    {
                        showRates.map(function(item,index){
                            return (
                                <Row key={index} className="border-row vertical-align">
                                    <Col xs={3} >
                                        <Image src={self.imageMap[item['carrier']]} responsive />
                                    </Col>
                                    <Col xs={3} >
                                        <div>
                                            <span>{item['est_delivery_days']} </span> Days<br/>
                                        </div>
                                    </Col>
                                    <Col xs={5} >
                                        <div>
                                            $ <span className="price">{item['rate']}</span><br/>
                                            Retail Price  $ <span>{item['retail_rate']}</span><br/>
                                        </div>
                                    </Col>
                                    <Col xs={1} >
                                        <Radio name="radioGroup" checked={self.props.picked_rate_id == item['id']} onChange={self.selectRate.bind(self,item['id'])} >
                                            <span className="radio-label"></span>
                                        </Radio>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </div>
                <div className="footer">
                    <div className="fr">
                        <Button  bsStyle="primary" onClick={this.submit.bind(this)} disabled={this.props.picked_rate_id == 0}>next</Button>
                    </div>

                </div>
            </div>

        );
    }
}
