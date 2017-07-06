import http from "../util/http"
import axios from "axios"

export function startShip(shipmentId) {
    return {
        type: "SHIPMENT_START",
        payload: {
            shipment_id: shipmentId
        }
    }
}

export function getFromAddress(shipmentId) {
    return (dispatch) => {
        axios.get(http.urlFormat(http.url.SHIPMENT_FROM_ADDRESS.url, shipmentId)).then(function (res) {
            dispatch({
                type: "GET_FROM_ADDRESS",
                payload: {
                    ...res.data.data.from_address
                }
            })
        })
    }
}

export function getToAddress(shipmentId) {
    return (dispatch) => {
        axios.get(http.urlFormat(http.url.SHIPMENT_TO_ADDRESS.url, shipmentId)).then(function (res) {
            dispatch({
                type: "GET_TO_ADDRESS",
                payload: {
                    ...res.data.data.to_address
                }
            })
        })
    }
}

export function updateFromAddress(address) {
    return {
        type: "SHIPMENT_UPDATE_FROM_ADDRESS",
        payload: address
    }
}

export function updateToAddress(address) {
    return {
        type: "SHIPMENT_UPDATE_TO_ADDRESS",
        payload: address
    }
}

export function getDetailInfo(shipmentId) {
    return (dispatch) => {
        axios.get(http.urlFormat(http.url.SHIPMENT_DETAIL.url, shipmentId)).then(function (res) {
            dispatch({
                type: "SHIPMENT_GET_DETAIL_INFO",
                payload: res.data.data
            })
        })
    }
}

export function updateDetailInfo(info) {
    return {
        type: "SHIPMENT_UPDATE_DETAIL_INFO",
        payload: info
    }
}

export function getRates(shipmentId) {
    return (dispatch) => {
        axios.get(http.urlFormat(http.url.SHIPMENT_RATES.url, shipmentId)).then(function (res) {
            dispatch({
                type: "SHIPMENT_GET_DETAIL",
                payload: res.data.data.rates
            })
        });
    }

}

export function updatePickedRateId(rateId){
    return {
        type:"SHIPMENT_UPDATE_PICKED_RATE_ID",
        payload:rateId
    }
}

export function getShipmentInfo(shipmentId){
    return (dispatch)=>{
        axios.get(http.urlFormat(http.url.SHIPMENT_INFO.url,shipmentId)).then(function(res){
            dispatch({
                type:"GET_SHIPMENT_INFO",
                payload:res.data.data
            })
        })
    }
}

export function updateShipmentLabel(data){
    return {
        type:"UPDATE_SHIPMENT_LABEL",
        payload:{
            label_url:data.label_png_url
        }
    }
}




