export default function reducer(state={
    googleMaps:null,
    showGuestDialog:false
},action){
    switch (action.type) {
        case "ELEMENT_GET_GOOGLE_MAP":
            return {
                ...state,
                googleMaps:action.payload
            }
        case "SHOW_GUEST_DIALOG":
            return {
                ...state,
                showGuestDialog:action.payload
            }
        default:
            return state;
    }
}

