
import loadGoogleMapsAPI  from "load-google-maps-api"
import {config} from "../util/config"


export function getGoogleMap(){
    return (dispatch)=>{
        let mapConfig = {
            libraries:["places"],
            key:config.googleMapApiKey
        }
        loadGoogleMapsAPI(mapConfig).then(function(googleMaps) {
            dispatch({
                type:"ELEMENT_GET_GOOGLE_MAP",
                payload:googleMaps
            });
        });
    }
}


export function showGuestDialog(show){
    return {
        type : "ELEMENT_SHOW_GUEST_DIALOG",
        payload:show
    }
}


export function updateToken(token){
    return {
        type : "ELEMENT_UPDATE_TOKEN",
        payload : token
    }
}

