import React from "react"
import {connect} from "react-redux"
import AddressForm from "../element/addressForm"
import {Button} from "react-bootstrap"
import axios from "axios"
import http from "../../util/http"
import {addAddress,getAddressBook,updateAddress} from "../../actions/userActions"


@connect((store) => {
    return{
        addressBook : store.user.addressBook
    }
})
export default class EditAddress extends React.Component{
    constructor(props){
        super(props);
        this.addressId = props.match.params["addressId"];
        this.state = {
            address : {
                "city": "",
                "country": "",
                "id": "",
                "name": "",
                "phone": "",
                "state": "",
                "street1": "",
                "zip": ""
            },
            errors : {
            }
        };
    }

    componentWillMount(){
        if(!!this.addressId){
            // let self = this;
            // this.props.addressBook.forEach(function(item){
            //     if(item['id'] == self.addressId){
            //         self.setState({address:item});
            //     }
            // });
            this.props.dispatch(getAddressBook());
        }
    }

    valueChanged(val){
        this.setState({address:val});
    }

    componentWillReceiveProps(props){
        let self = this;
        if(props.addressBook && this.addressId){
            props.addressBook.forEach(function(item){
                if(item['id'] == self.addressId){
                    self.setState({address:item});
                }
            })
        }
    }

    submit(){
        let self = this;
        let data = this.state.address;
        if(this.addressId){
            axios.post(http.urlFormat(http.url.USER_ADDRESS_BOOL_OPERATION.url,self.addressId),data).then(function(res){
                self.props.dispatch(updateAddress(data));
                self.props.history.push("/user/address-book");
            })
        }else{
            axios.post(http.url.USER_ADDRESS_BOOK.url,data).then(function(res){
                self.props.dispatch(addAddress(res.data.data));
                self.props.history.push("/user/address-book");
            })
        }
    }

    render(){
        return (<div className="edit-address mt-20">
            <AddressForm data={this.state.address} errors={this.state.errors} valueChanged={this.valueChanged.bind(this)} address_validation_errors={this.state.address_validation_errors} />
            <div className='pull-left mt-20'>
                <Button className="fr" bsStyle="primary" onClick={this.submit.bind(this)} >Submit</Button>
            </div>
        </div>)
    }
}