/**
 * Created by su on 6/7/17.
 */

import axios from "axios"
import http from "../util/http"


export function updateUserProfile(profile){
    return {
        type : "USER_UPDATE_PROFILE",
        payload : profile,
    }
}


export function getAddressBook(){
    return (dispatch)=>{
        axios.get(http.url.USER_ADDRESS_BOOK.url).then(function(res){
            dispatch({
                type:"USER_GET_ADDRESS_BOOK",
                payload: res.data.data.addresses
            })
        })
    }
}

export function addAddress(address){
    return {
        type:"USER_ADD_ADDRESS",
        payload:address
    }
}

export function deleteAddress(addressId){
    return{
        type:"USER_DELETE_ADDRESS",
        payload:addressId
    }
}


export function getUserProfile(){
    return(dispatch)=>{
        axios.get(http.url.USER_PROFILE.url).then(function(res){
            dispatch({
                type:"USER_GET_PROFILE",
                payload:res.data.data
            })
        });
    }
}

export function logout(){
    return {
        type : "USER_LOGOUT",
        payload:""
    }
}

//
// export function updateAddress(address){
//     return {
//         type:"USER_UPDATE_ADDRESS",
//         payload : address
//     }
// }