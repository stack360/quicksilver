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
                title : "From Address",
                indicator: "&#x2460;",
                short_title: "From"
            },  {
                url : "/shipment/to/"+ this.props.shipmentId ,
                title : "To Address",
                indicator: "&#x2461;",
                short_title: "To"
            },
            {
                url : "/shipment/detail/"+ this.props.shipmentId ,
                title : "Package Info",
                indicator: "&#x2462;",
                short_title: "Pkg"
            },{
                url : "/shipment/rates/"+this.props.shipmentId ,
                title : "Get Rate",
                indicator: "&#x2463;",
                short_title: "Rate"
            },{
                url : "/shipment/confirm/"+this.props.shipmentId ,
                title : "Create Label",
                indicator: "&#x2464;",
                short_title: "Label"
            }
        ];

        let step = this.props.currentStep;
        let self = this;
        return(
        <ul className="main-breadcrumb mb-30 mt-20">
            {
                config.map(function(item,index){
                    let title = item['title'];
                    let title_indicator = <span dangerouslySetInnerHTML={{__html: item['indicator']}} /> ;

                    if (self.state.width<705){
                        title = item['short_title'];
                        title_indicator = "" ;
                    }
                    if(step >index){
                        return(
                            <li key={index} className="active">
                                <Link to={item['url']}>
                                    {title_indicator} {title}
                                </Link>
                            </li>
                        );
                    }else{
                        return (
                            <li key={index}>
                                <a href="javascript:void(0);" className='disabled'>
                                    {title_indicator} {title}
                                </a>
                            </li>
                        );
                    }
                })
            }

        </ul>
        );
    }
}



