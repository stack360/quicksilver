import React from "react"
import {connect} from "react-redux"

import {Row,Button,Table} from "react-bootstrap"
import {getAddressBook} from "../../actions/userActions"

import axios from "axios"
import http from "../../util/http"
import {deleteAddress} from "../../actions/userActions"

@connect((store) => {
    return{ addressBook : store.user.addressBook}
})
export default class AddressBook extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount(){
        this.props.dispatch(getAddressBook());
    }

    add(){
        this.props.history.push("/user/edit-address/");
    }

    delete(addressId){
        let self = this;
        if(window.confirm("Are you really want to delete this address ?")){
            axios.delete(http.urlFormat(http.url.USER_ADDRESS_BOOL_OPERATION.url,addressId)).then(function(){
                self.props.dispatch(deleteAddress(addressId));
            })
        }
    }

    edit(addressId){
        this.props.history.push("/user/edit-address/" + addressId);
    }



    render() {
        let self = this;
        return ( <div className="address-book">
            <span className="title"> AddressBook</span>
            <Button onClick={this.add.bind(this)}>Add</Button>

            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.addressBook.map(function (item, index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item['name']}</td>
                                <td>
                                    <a href="javascript:void(0);"> <span className="operation" onClick={self.edit.bind(self,item['id'])}>Edit</span></a>
                                    <a href="javascript:void(0);"> <span className="operation" onClick={self.delete.bind(self,item['id'])}>Delete</span></a>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>


        </div>);
    }
}