/**
 * Created by su on 6/7/17.
 */
export default function reducer(state={
    profile:{
        id:null,
        username:null,
        role:null
    },
    addressBook:[]
},action){
    switch (action.type) {
        case "USER_UPDATE_PROFILE":
            return{
                ...state,
                profile:action.payload
            }

        case "USER_GET_ADDRESS_BOOK":
            return {
                ...state,
                addressBook:action.payload
            }
        case "USER_ADD_ADDRESS":

            var book = state.addressBook.slice(0);
            book.unshift(action.payload);
            return {
                ...state,
                addressBook:book
            }
        case "USER_DELETE_ADDRESS":

             book = state.addressBook.filter(function(item){
                if(item['id'] == action.payload){
                    return false;
                }
                return true;
            })

            return{
                ...state,
                addressBook: book
            }
        case"USER_UPDATE_ADDRESS":

            book = state.addressBook.map(function(item){
                if(item['id'] == action.payload['id']){
                    return action.payload;
                }
                return item;
            });

            return{
                ...state,
                addressBook : book
            }
        default:
            return state;
    }
}


