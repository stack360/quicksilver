import React from "react"
import {Image} from "react-bootstrap"
import {Link} from "react-router-dom"
import {Form, FormGroup, FormControl, Col, Button} from "react-bootstrap"
import {connect} from "react-redux"


@connect((store) => {
    return {
        shipment: store.shipment,
    }
})
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        const imagePath = require("../../image/test-label.jpeg");
        return (
            <div>
            <Col xs={12}></Col>
            <Col xs={0} md={2} lg={3}></Col>
            <Col xs={12} md={8} lg={6}>
                <Image src={this.props.shipment.label_url} responsive />
            </Col>
            </div>
        );
    }
}
