import React from "react"
import {Form, FormGroup, FormControl, ControlLabel, Checkbox, Row, Col, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {getDetailInfo,updateDetailInfo} from "../../actions/shipmentAction"
import axios from "axios"
import http from "../../util/http"
import Breadcrumb from "../element/breadcrumb"


@connect((store) => {
    return {
        shipment: store.shipment,
    }
})
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.shipmentId = props.match.params["ship_id"];
    }

    componentWillMount() {
        this.props.dispatch(getDetailInfo(this.shipmentId));
    }


    valueChanged(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == 'insured'){
            this.props.dispatch(updateDetailInfo({
                insured: !this.props.shipment.insured
            }))
        } else {
            this.props.dispatch(updateDetailInfo({
                [name]:parseFloat(value)
            }));
        }
    }

    submit(){
        let self = this;
        let shipment = this.props.shipment;
        var data = {
            width: shipment['width'],
            length : shipment['length'],
            height : shipment['height'],
            weight : shipment['weight'],
            insured : shipment['insured'],
            insured_value : shipment['insured_value']
        };
        axios.post(http.urlFormat(http.url.SHIPMENT_DETAIL.url,this.shipmentId),data).then(function(res){
            self.props.history.push("/shipment/rate-list/" + self.shipmentId);
        })
    }

    render() {
        return (<div className="detail pt-20">
            <Breadcrumb shipmentId={this.shipmentId} currentStep={3}></Breadcrumb>
            <h4> Package Detail </h4>
            <div className="note">To make sure your dimensions are accurate, measure around the outside of your box or envelope</div>

            <div className="grey-box mt-20">
            <Row>
            <Col xs={12}>
                <Form horizontal>
                    <h4>Dimensions</h4>
                    <div>
                    <Row>
                        <Col xs={4}><label>Length</label></Col>
                        <Col xs={4}><label>Width</label></Col>
                        <Col xs={4}><label>Height</label></Col>
                    </Row>
                    <Row>
                    <Col xs={4}>
                        <FormControl type="number" placeholder="Length" name="length"
                                     value={this.props.shipment.length}
                                     onChange={this.valueChanged.bind(this)}/>
                    </Col>

                    <Col xs={4}>
                        <FormControl type="number" placeholder="Width" name="width"
                                     value={this.props.shipment.width}
                                     onChange={this.valueChanged.bind(this)}/>
                    </Col>

                    <Col xs={4}>
                        <FormControl type="number" placeholder="Height" name="height"
                                    value={this.props.shipment.height}
                                    onChange={this.valueChanged.bind(this)}/>
                    </Col>
                    </Row>

                    <h4 className="mt-20">Weight</h4>
                    <Row>
                        <Col xs={4}>
                            <FormControl type="number" placeholder="Weight" name="weight"
                                             value={this.props.shipment.weight}
                                             onChange={this.valueChanged.bind(this)}/>
                        </Col>
                        <Col xs={4}>Pounds</Col>
                    </Row>

                    <h4 className='mt-20'>Insurance</h4>
                    <Row>
                        <Col xs={12}>
                            <Checkbox name="insured" checked={this.props.shipment.insured}
                                      onChange={this.valueChanged.bind(this)} >
                                <span className="checkbox-label">Yes, I want this package insured</span>
                            </Checkbox>
                        </Col>


                        <Col xs={4} className="pt-10">
                            <FormControl name="insured_value" type="number" placeholder="Value of your package"
                                         value={this.props.shipment.insured_value}
                                         onChange={this.valueChanged.bind(this)}/>
                        </Col>
                    </Row>
                    </div>
                    </Form>

            </Col>

            <div className="pull-left mt-20">
                <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)}>Get Rate</Button>
            </div>
            </Row>
           </div>
        </div>);
    }
}
