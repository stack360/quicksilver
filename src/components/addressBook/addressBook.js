/**
 * Created by su on 6/8/17.
 */

import React from 'react'
import {connect} from "react-redux"


@connect((store)=>{
    return {
        user:store.user.user
    };
})
export default class AddressBook extends React.Component {

    render(){
        console.log(this.props);
        return (<div>age is : {this.props.user.age}</div>);
    }
}

