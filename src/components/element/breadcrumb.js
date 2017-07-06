import React from "react"
import {Form, FormGroup, FormControl, Row, Col, Button} from "react-bootstrap"
import {connect} from "react-redux"
import {Link} from "react-router-dom"


export default class Breadcrumb extends React.Component {
    constructor(props){
        super(props);
        this.state = {width:0};
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions(){
        this.setState({
            width: window.innerWidth
        });
    }

    render(){
        let config = [
            {
                url : "/shipment/from/"+ this.props.shipmentId,
                title : "① From Address",
                short_title: "From"
            },  {
                url : "/shipment/to/"+ this.props.shipmentId ,
                title : "② To Address",
                short_title: "To"
            },
            {
                url : "/shipment/detail/"+ this.props.shipmentId ,
                title : "③ Package Info",
                short_title: "Pkg"
            },{
                url : "/shipment/rates/"+this.props.shipmentId ,
                title : "④ Get Rate",
                short_title: "Rate"
            },{
                url : "/shipment/confirm/"+this.props.shipmentId ,
                title : "⑤ Create Label",
                short_title: "Label"
            }
        ];

        let step = this.props.currentStep;
        let self = this;
        return(
        <ul className="main-breadcrumb mb-30 mt-20">
            {
                config.map(function(item,index){
                    if(step >index){
                        return(
                            <li key={index} className="active">
                                <Link to={item['url']}> {self.state.width<705? item['short_title'] : item['title']}</Link>
                            </li>
                        );
                    }else{
                        return (
                            <li key={index}>
                                <a href="javascript:void(0);" className='disabled'> {self.state.width<705 ? item['short_title'] : item['title']}</a>
                            </li>
                        );
                    }
                })
            }

        </ul>
        );
    }
}



