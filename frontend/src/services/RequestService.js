import axios from 'axios';
import awsconfig from '../aws-exports';
import { Config } from "../boundary/common/Config"

import store from '../model/ModelProxy';
import { enqueueNotification } from "../model/ViewModel";

export default class RequestService {

    constructor() {

        this.addRequestSuccessListeners = []
        this.getRequestListeners = []
    }

    registerAddRequestSuccessListener(cb) {

        this.addRequestSuccessListeners.push(cb)

    }

    executeAddRequest(cb, data, object, endpoint) {

        console.log("Executing add request: ", data)

        var model = store.getState().model;

        data.authorId = model.currentUser.username;

        axios.post(Config.API_PATH + object + "/" + endpoint,
            data,
            {
                headers: {
                    'Authorization': (model.currentUser) ? (model.currentUser.token) : ""
                }
            }
        ).then(res => {

            console.log("AddRequest: ", res)

            if (res.data.statusCode == "400" || res.data.statusCode == 400) {

                store.dispatch(enqueueNotification({
                    name: "add_request_status",
                    widgetKey: "",
                    status: "request_complete",
                    msg: "Failed to create " + object + "\n" + "error: " + res.data.error,
                    type: "error"
                }))

                cb(res.data.error)

            } else {

                store.dispatch(enqueueNotification({
                    name: "add_request_status",
                    widgetKey: "",
                    status: "request_complete",
                    msg: "Created " + object + " successfully!",
                    type: "success"
                }))

                for (var i in this.addRequestSuccessListeners) {

                    this.addRequestSuccessListeners[i](res)
                }

                cb("")
            }

        }).catch((err) => {

            store.dispatch(enqueueNotification({
                name: "add_request_status",
                widgetKey: "",
                status: "request_complete",
                msg: "Failed to create " + object + "\n",
                type: "error"
            }))

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