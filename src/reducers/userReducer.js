/**
 * Created by su on 6/7/17.
 */
export default function reducer(state={
    user:{
        id:null,
        name:null,
        age:null,
    },
    fetching:false,
    fetched:false,
    error:null
},action){
    switch (action.type) {
        case "FETCH_USER_FULFILLED":
            return {
                ...state,
                fetching:false,
                fetched:true,
                user:action.payload
            }
        default:
            return state;
    }
}


