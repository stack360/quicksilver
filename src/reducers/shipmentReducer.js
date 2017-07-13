export default function reducer(state={
    from_address:{
        "city": "",
        "country": "",
        "id": "",
        "name": "",
        "phone": "",
        "state": "",
        "street1": "",
        "street2": "",
        "zip": ""
    },
    to_address:{
        "city": "",
        "country": "",
        "id": "",
        "name": "",
        "phone": "",
        "state": "",
        "street1": "",
        "zip": ""
    },
    rates:[],
    "height":"",
    "id": "",
    "is_draft": true,
    "length":"",
    "weight":"",
    "width":"",
    "value":"",
    "insured":false,
    "insured_value":0,
    "label_url":"",
    "shipment_id":0,
    "picked_rate_id":0,
},action){
    switch (action.type) {
        case "GET_FROM_ADDRESS":
            return {
                ...state,
                from_address:{...state.from_address,...action.payload}
            };
        case "SHIPMENT_START":
            return {
                ...state,
                shipment_id:action.payload.shipment_id
            };
        case "SHIPMENT_UPDATE_FROM_ADDRESS":
            let from = {
                ...state.from,
                ...action.payload
            }
            return {
                ...state,
                from_address:from
            }
        case "GET_TO_ADDRESS":
            return {
                ...state,
                to_address:{...state.to_address, ...action.payload}
            };

        case "SHIPMENT_UPDATE_TO_ADDRESS":
            let to = {
                ...state.to,
                ...action.payload
            }
            return {
                ...state,
                to_address:to
            }
        case "SHIPMENT_GET_DETAIL_INFO":
            return {
                ...state,
                ...action.payload
            }
        case "SHIPMENT_UPDATE_DETAIL_INFO":
            return {
                ...state,
                ...action.payload
            }
        case "SHIPMENT_GET_RATES":
            return{
                ...state,
                ...action.payload
            }
        case "SHIPMENT_UPDATE_PICKED_RATE_ID":
            return {
                ...state,
                picked_rate_id:action.payload
            }
        case "GET_SHIPMENT_INFO":
            return {
                ...state,
                ...action.payload
            }
        case "UPDATE_SHIPMENT_LABEL":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
