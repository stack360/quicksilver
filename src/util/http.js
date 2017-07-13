/**
 * Created by su on 6/14/17.
 */

import axios from "axios"
import Cookies from 'universal-cookie';
import {updateLoginState} from "../actions/elementAction"
import {config} from "./config"
import {updateToken} from "../actions/elementAction"
import store from "../store"


class Http {
    constructor(){
        this.cookies = new Cookies();
        var token =  this.cookies.get("token") || "";
        if(token){
            store.dispatch(updateToken(token));
        }

        let self = this;
        store.subscribe(()=>{
            var newToken = store.getState()['element']['token'];
            if(newToken != token){
                self.tokenUpdate(newToken);
                token = newToken;
            }
        })

        this.guest_id = this.cookies.get("guest_id") ||  "";
        this.initInterceptors();
        this.initUrl();


    }

    initUrl(){
        var host = config['apiHost'];

        var prefix = "/api/v1/";
        this.url = {
            SHIPMENT_START:{
                url: host + prefix +  "shipment/start",
            },
            SHIPMENT_FROM_ADDRESS:{
                url: host + prefix + "shipment/{0}/from_address"
            },
            SHIPMENT_TO_ADDRESS:{
                url: host + prefix + "shipment/{0}/to_address"
            },
            SHIPMENT_DETAIL:{
                url : host + prefix + "shipment/{0}/detail"
            },
            SHIPMENT_RATES:{
                url : host + prefix + "shipment/{0}/rates"
            },
            SHIPMENT_SAVE_RATES:{
                url : host + prefix + "shipment/{0}/rates/{1}"
            },
            SHIPMENT_INFO :{
                url : host + prefix + "shipment/{0}"
            },
            SHIPMENT_CONFIRM:{
                url : host + prefix + "shipment/{0}/confirm"
            },
            PAYMENT_CREATE_PAYMENT:{
                url : host + prefix + "payment/{0}/create"
            },
            PAYMENT_EXECUTE:{
                url : host + prefix + "payment/execute"
            },
            LOGIN:{
                url : host + prefix + "user/login"
            },
            REGISTER:{
                url : host + prefix + "user/register"
            },
            USER_ADDRESS_BOOK :{
                url : host + prefix + "address"
            },
            USER_ADDRESS_BOOL_OPERATION : {
                url : host + prefix + "address/{0}"
            },
            USER_PROFILE : {
                url : host + prefix + "user/info"
            }
        }
    }
    initInterceptors(){
        let self = this;
        axios.interceptors.request.use(function (config) {
            var token = store.getState()['element']['token'];
            let header = {};
            if(token || self.guest_id){
                if(token){
                    header["X-Auth-Token"] = token;
                }
                if(self.guest_id){
                    header["X-Auth-Guest-Id"] = self.guest_id;
                }
                config.headers = Object.assign({},config.headers,header);
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            if (response.data.extras){
                var token = store.getState()['element']['token'];
                let extra = response.data.extras;
                if(!!extra.token && extra.token != token){
                    store.dispatch(updateToken(extra.token));
                }
                if(!!extra.guest_id && extra.guest_id != self.guestId){
                    self.guest_id = extra.guest_id;
                    self.cookies.set("guest_id",self.guest_id,{path:'/'});
                }
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }


    tokenUpdate(token){
        if(token){
            this.cookies.set("token",token,{path:'/'})
        }else{
            this.cookies.remove("token",{path:'/'});
        }
    }

    removeIds(){
        this.guest_id = "";
        this.cookies.remove("token",{path:'/'});
        this.cookies.remove("guest_id",{path:'/'});
    }

    logout(){
        this.cookies.remove("token",{path:'/'});
        store.dispatch(updateToken(""));
    }

    urlFormat(str){
        var args = Array.prototype.slice.call(arguments,1);
        return str.replace(/{(\d+)}/g,function(match, number){
            return typeof args[number] != undefined
                ? args[number] : match;
        });
    }

    addressErrorCatch(data){

    }
}

const http = new Http();
export default http;
