import axios from 'axios';
import awsconfig from '../aws-exports';
import { Config } from "../boundary/common/Config"

import store from '../model/ModelProxy';
import { enqueueNotification } from "../model/ViewModel";

export default class RequestService {

    constructor() {

        this.addRequestSuccessListeners = []
        this.removeRequestSuccessListeners = []
        
        this.getRequestListeners = []
    }

    registerAddRequestSuccessListener(cb) {

        this.addRequestSuccessListeners.push(cb)
    }

    registerRemoveRequestSuccessListener(cb) {

        this.removeRequestSuccessListeners.push(cb)
    }

    executePostRequest(cb, data, endpoint, errMsg, successMsg) {

        console.log("Executing post request: ", data)

        var model = store.getState().model;

        data.authorId = model.currentUser.username;

        axios.post(Config.API_PATH + endpoint,
            data,
            {
                headers: {
                    'Authorization': (model.currentUser) ? (model.currentUser.token) : ""
                }
            }
        ).then(res => {

            console.log("AddRequest: ", res)

            if (res.data.statusCode == "400" || res.data.statusCode == 400) {

                if(errMsg.length > 0) {

                    store.dispatch(enqueueNotification({
                        name: "add_request_status",
                        widgetKey: "",
                        status: "request_complete",
                        msg: errMsg,
                        type: "error"
                    }))
                }


                cb(res.data.error)

            } else {

                if(successMsg.length > 0) {

                    store.dispatch(enqueueNotification({
                        name: "add_request_status",
                        widgetKey: "",
                        status: "request_complete",
                        msg: successMsg,
                        type: "success"
                    }))
                }

                for (var i in this.addRequestSuccessListeners) {

                    this.addRequestSuccessListeners[i](res)
                }

                cb("")
            }

        }).catch((err) => {

            if(errMsg.length > 0) {

                store.dispatch(enqueueNotification({
                    name: "add_request_status",
                    widgetKey: "",
                    status: "request_complete",
                    msg: errMsg,
                    type: "error"
                }))
            }

            cb(err)
        })

    }

    executeGetRequest(cb, url) {

        var model = store.getState().model;
        axios.get(Config.API_PATH + url, {
            headers: {
                'Authorization': (model.currentUser) ? (model.currentUser.token) : ""
            }
        })
            .then(res => {
                console.log("GetRequest: ", res)

                if (res.data && res.data.statusCode !== 400 || res.data.statusCode !== "400") {

                    cb("", res.data)

                } else {

                    cb(res.data.error ?? "error", null)
                }
            }).catch(res => {

                cb("error", null)
            })
    }
}