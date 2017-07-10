export default function reducer(state={
    googleMaps:null,
    showGuestDialog:false,
    token:"",
},action){
    switch (action.type) {
        case "ELEMENT_GET_GOOGLE_MAP":
            return {
                ...state,
                googleMaps:action.payload
            }
        case "ELEMENT_SHOW_GUEST_DIALOG":
            return {
                ...state,
                showGuestDialog:action.payload
            }

        case "ELEMENT_UPDATE_TOKEN":
            return {
                ...state,
                token : action.payload
            }

        default:
            return state;
    }
}

