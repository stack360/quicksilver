/**
 * Created by su on 6/7/17.
 */
import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux'

import tweets from "./tweetsReducer"
import user from "./userReducer"
import shipment from "./shipmentReducer"
import element from "./elementReducer"



export default combineReducers(
    {
        tweets,
        user,
        shipment,
        element,
        routing:routerReducer
    }
)


