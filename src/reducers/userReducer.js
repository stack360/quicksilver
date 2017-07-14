/**
 * Created by su on 6/7/17.
 */


const defaultState = {
    profile: {
        id: null,
        username: null,
        role: null
    },
    address_book: [],
    token: "",
    guest_id: ""
}


export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "USER_UPDATE_PROFILE":
            return {
                ...state,
                profile: action.payload
            }

        case "USER_GET_ADDRESS_BOOK":
            return {
                ...state,
                address_book: action.payload
            }
        case "USER_ADD_ADDRESS":

            var book = state.address_book.slice(0);
            book.unshift(action.payload);
            return {
                ...state,
                address_book: book
            }
        case "USER_DELETE_ADDRESS":

            book = state.address_book.filter(function (item) {
                if (item['id'] == action.payload) {
                    return false;
                }
                return true;
            })

            return {
                ...state,
                address_book: book
            }
        case"USER_UPDATE_ADDRESS":

            book = state.address_book.map(function (item) {
                if (item['id'] == action.payload['id']) {
                    return action.payload;
                }
                return item;
            });

            return {
                ...state,
                address_book: book
            }
        case "USER_GET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
        case "USER_LOGOUT":
            return defaultState;
        case "USER_UPDATE_TOKEN":
            return {
                ...state,
                token: action.payload
            };
        case "USER_UPDATE_GUEST_ID":
            return {
                ...state,
                guest_id: action.payload
            }
        default:
            return state;
    }
}


