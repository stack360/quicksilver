export default function reducer(state={
    googleMaps:null,
    gustDialogInfo:{
        show:false,
        loginCallback:null,
        expressCallback:null,
        registerCallback:null
    },
    token:"",
},action){
    switch (action.type) {
        case "ELEMENT_GET_GOOGLE_MAP":
            return {
                ...state,
                googleMaps:action.payload
            }
        case "ELEMENT_SHOW_GUEST_DIALOG":
            let info = Object.assign({show:true},action.payload);
            return {
                ...state,
                gustDialogInfo:info
            };

        case "ELEMENT_HIDE_GUEST_DIALOG":
            return {
                ...state,
                gustDialogInfo:{
                    show:false,
                    loginCallback:null,
                    expressCallback:null,
                    registerCallback:null
                }
            };

        case "ELEMENT_UPDATE_TOKEN":
            return {
                ...state,
                token : action.payload
            };

        default:
            return state;
    }
}

