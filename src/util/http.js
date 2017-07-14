/**
 * Created by su on 6/14/17.
 */

import axios from "axios"
import Cookies from 'universal-cookie';
import {updateLoginState} from "../actions/elementAction"
import {config} from "./config"
import {updateToken, updateGuestId} from "../actions/userActions"
import store from "../store"
import {push} from "react-router-redux"


class Http {
    constructor() {
        this.cookies = new Cookies();
        var token = this.cookies.get("token") || "";
        var guest_id = this.cookies.get("guest_id") || "";
        if (token) {
            store.dispatch(updateToken(token));
        }
        if (guest_id) {
            store.dispatch(updateGuestId(guest_id));
        }

        let self = this;
        store.subscribe(() => {
            debugger
            var user = store.getState()['user'];
            var newToken = user['token'];
            if (newToken != token) {
                self.tokenUpdate(newToken);
                token = newToken;
            }
            var newGuestId = user['guest_id']
            if (newGuestId != guest_id) {
                self.guestIdUpdate(newGuestId);
                guest_id = newGuestId;
            }

        })


        this.initInterceptors();
        this.initUrl();


    }

    initUrl() {
        var host = config['apiHost'];

        var prefix = "/api/v1/";
        this.url = {
            SHIPMENT_START: {
                url: host + prefix + "shipment/start",
            },
            SHIPMENT_FROM_ADDRESS: {
                url: host + prefix + "shipment/{0}/from_address"
            },
            SHIPMENT_TO_ADDRESS: {
                url: host + prefix + "shipment/{0}/to_address"
            },
            SHIPMENT_DETAIL: {
                url: host + prefix + "shipment/{0}/detail"
            },
            SHIPMENT_RATES: {
                url: host + prefix + "shipment/{0}/rates"
            },
            SHIPMENT_SAVE_RATES: {
                url: host + prefix + "shipment/{0}/rates/{1}"
            },
            SHIPMENT_INFO: {
                url: host + prefix + "shipment/{0}"
            },
            SHIPMENT_CONFIRM: {
                url: host + prefix + "shipment/{0}/confirm"
            },
            PAYMENT_CREATE_PAYMENT: {
                url: host + prefix + "payment/{0}/create"
            },
            PAYMENT_EXECUTE: {
                url: host + prefix + "payment/execute"
            },
            LOGIN: {
                url: host + prefix + "user/login"
            },
            REGISTER: {
                url: host + prefix + "user/register"
            },
            USER_ADDRESS_BOOK: {
                url: host + prefix + "address"
            },
            USER_ADDRESS_BOOL_OPERATION: {
                url: host + prefix + "address/{0}"
            },
            USER_PROFILE: {
                url: host + prefix + "user/info"
            }
        }
    }

    initInterceptors() {
        axios.interceptors.request.use(function (config) {
            var user = store.getState()['user'];
            var token = user['token'];
            var guestId = user['guest_id'];
            let header = {};
            if (token || guestId) {
                if (token) {
                    header["X-Auth-Token"] = token;
                }
                if (guestId) {
                    header["X-Auth-Guest-Id"] = guestId;
                }
                config.headers = Object.assign({}, config.headers, header);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            if (response.data.extras) {
                var user = store.getState()['user'];
                var token = user['token'];
                var guestId = user['guest_id'];

                let extra = response.data.extras;
                if (!!extra.token && extra.token != token) {
                    store.dispatch(updateToken(extra.token));
                }
                if (!!extra.guest_id && extra.guest_id != guestId) {
                    store.dispatch(updateGuestId(extra.guest_id));
                }
            }
            return response;
        }, function (error) {
            if(error.response.status == 403){
                var data = error.response.data;
                if(data.error == "X-Auth-Token is wrong"){
                    store.dispatch(updateToken(""));
                }else if(data.error == "X-Auth-Guest-Id is wrong"){
                    store.dispatch(updateGuestId(""));
                }else{
                    store.dispatch(updateToken(""));
                    store.dispatch(updateGuestId(""));
                }
                store.dispatch(push("/"));

            }
            return Promise.reject(error);
        });
    }


    tokenUpdate(token) {
        if (token) {
            this.cookies.set("token", token, {path: '/'})
        } else {
            this.cookies.remove("token", {path: '/'});
        }
    }

    guestIdUpdate(guestId) {
        debugger
        if (guestId) {
            this.cookies.set("guest_id", guestId, {path: '/'})
        } else {
            this.cookies.remove("guest_id", {path: '/'});
        }
    }

    urlFormat(str) {
        var args = Array.prototype.slice.call(arguments, 1);
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != undefined
                ? args[number] : match;
        });
    }

}

const http = new Http();
export default http;
