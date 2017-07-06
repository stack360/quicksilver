import React from "react"


export default class GuestInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                <span>Please input you information</span>
                <Button bsStyle="primary" bsSize="large" > submit</Button>
            </div>
        );
    }
}