import axios from 'axios';
import awsconfig from '../aws-exports';
import { Config } from "../boundary/common/Config"

import store from '../model/ModelProxy';
import { updateOperationStatus } from "../model/ViewModel";

export default class RequestService {

    constructor(model) {

        this.addRequestSuccessListeners = []
        this.getRequestListeners = []
        this.model = model;
    }

    registerAddRequestSuccessListener(cb) {

        this.addRequestSuccessListeners.push(cb)

    }

    executeAddRequest(cb, data, object, endpoint) {

        axios.post(Config.API_PATH + object + "/" + endpoint,
            data,
            {
                headers: {
                    'Authorization': this.model.currentUser.token ?? ""
                }
            }
        ).then(res => {

            console.log("AddRequest: ", res)

            if (res.data.statusCode == "400" || res.data.statusCode == 400) {

                store.dispatch(updateOperationStatus({
                    name: "add_request_status",
                    widgetKey: "",
                    status: "request_complete",
                    msg: "Failed to create " + object + "\n" + "error: " + res.data.error,
                    type: "error"
                }))

                cb(res.data.error)

            } else {

                store.dispatch(updateOperationStatus({
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

            store.dispatch(updateOperationStatus({
                name: "add_request_status",
                widgetKey: "",
                status: "request_complete",
                msg: "Failed to create " + object + "\n",
                type: "error"
            }))

            cb("error")
        })

    }

    executeGetRequest(cb, url) {

        axios.get(Config.API_PATH + url, {
            headers: {
                'Authorization': this.model.currentUser.token ?? ""
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