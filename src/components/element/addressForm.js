import React from "react"
import {Form, FormGroup, FormControl, Row, Col, Button, ControlLabel, HelpBlock} from "react-bootstrap"
import {connect} from "react-redux"
import {getGoogleMap} from "../../actions/elementAction"

@connect((store) => {
    return {
        googleMaps: store.element.googleMaps,
    }
})
export default class AddressForm extends React.Component {
    constructor(props){
        super(props);
        this.autocomplete = null;
        this.listener = null;
        this.googleMaps = null;
    }

    componentDidMount(){
        if(this.props.googleMaps){
            this.initAutoComplete(this.props.googleMaps);
        }else{
            this.props.dispatch(getGoogleMap());
        }
    }

    initAutoComplete(googleMaps){
        this.googleMaps = googleMaps;
        this.autocomplete = new googleMaps.places.Autocomplete(
            (document.getElementById('address')),
            {types: ['geocode']});

        this.listener = this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.googleMaps && this.autocomplete == null){
            this.initAutoComplete(nextProps.googleMaps);
        }
    }

    componentWillUnmount(){
        if(this.autocomplete){
            this.googleMaps.event.removeListener(this.listener);
            this.googleMaps.event.clearInstanceListeners(this.autocomplete);
        }
    }

    geolocate() {
        if (navigator.geolocation && this.autocomplete) {
            let self = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = self.googleMaps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                this.autocomplete.setBounds(circle.getBounds());
            });
        }
    }

    fillInAddress(){
        if(this.autocomplete){
            let place = this.autocomplete.getPlace();
            var componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            var valMap = {};
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    valMap[addressType] = val;
                }
            }

            var address = {};
            address['street1'] = valMap['street_number'] + ' ' + valMap['route'];
            address['city'] = valMap['locality'];
            address['state'] = valMap['administrative_area_level_1'];
            address['country'] = valMap['country'];
            address['zip'] = valMap['postal_code'];

            if(this.props.valueChanged){
                let data = {
                    ...this.props.data,
                    ...address
                }
                this.props.valueChanged(data);
            }
        }
    }


    valueChanged(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(this.props.valueChanged){
            this.props.valueChanged({
                ...this.props.data,
                [name]:value
            })
        }
    }




    render(){

       return( <Form horizontal>
                <div className="grey-box">
                <Row>
                    <Col xs={12}>
                        <Col xs={6}>
                        <FormGroup controlId="name" validationState={this.props.errors.name ? "error" : null}>
                            <div className="form-group-gap">
                                <ControlLabel className="">Name</ControlLabel>
                                <FormControl name="name" type="txt" placeholder="Name"
                                             value={this.props.data.name}
                                             onChange={this.valueChanged.bind(this)}/>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.name}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup controlId="phone" validationState={this.props.errors.phone ? "error" : null}>
                            <div className="form-group-gap">
                            <ControlLabel for="">Phone Number</ControlLabel>
                                <FormControl placeholder="Phone" name="phone"
                                             onChange={this.valueChanged.bind(this)} value={this.props.data.phone}/>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.phone}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>

                    <Col xs={12}>
                        <FormGroup controlId="address" validationState={this.props.errors.street1 ? "error" : null}>
                        <div className="form-group-gap">
                            <ControlLabel for="">Street</ControlLabel>
                            <FormControl type="txt" name="street1" onChange={this.valueChanged.bind(this)} value={this.props.data.street1} placeholder="Street address" onFocus={this.geolocate.bind(this)}/>
                            <FormControl.Feedback />
                            <HelpBlock>{this.props.errors.street1}</HelpBlock>
                        </div>
                        </FormGroup>
                    </Col>
                   <Col xs={6}>
                        <FormGroup controlId="city" validationState={this.props.errors.city ? "error" : null}>
                            <div className="form-group-gap">
                                <ControlLabel for="">City</ControlLabel>
                                <FormControl name="city" value={this.props.data.city}
                                             placeholder="City" onChange={this.valueChanged.bind(this)}>
                                </FormControl>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.city}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup controlId="state" validationState={this.props.errors.state ? "error" : null}>
                            <div className="form-group-gap">
                                <ControlLabel for="">State</ControlLabel>
                                <FormControl name="state"  value={this.props.data.state}
                                             placeholder="State" onChange={this.valueChanged.bind(this)}>
                                </FormControl>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.state}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup controlId="country" validationState={this.props.errors.country ? "error" : null}>
                            <div className="form-group-gap">
                                <ControlLabel for="">Country</ControlLabel>
                                <FormControl name="country"  onChange={this.valueChanged.bind(this)} placeholder="Country" value={this.props.data.country}>
                                </FormControl>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.country}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>

                    <Col xs={6}>
                        <FormGroup controlId="zip" validationState={this.props.errors.zip ? "error" : null}>
                            <div className="form-group-gap">
                                <ControlLabel for="">Zip Code</ControlLabel>
                                <FormControl name="zip" value={this.props.data.zip}
                                             placeholder="Zip" onChange={this.valueChanged.bind(this)}>
                                </FormControl>
                                <FormControl.Feedback />
                                <HelpBlock>{this.props.errors.zip}</HelpBlock>
                            </div>
                        </FormGroup>
                    </Col>
                </Col>
            </Row>
            </div>
        </Form>);
    }
}
