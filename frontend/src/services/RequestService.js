import axios from 'axios';
import awsconfig from '../aws-exports';
import {Config} from "../boundary/common/Config"

export default class RequestService {

    constructor(model, enqueueSnackbar) {

        this.addRequestSuccessListeners = []
        this.getRequestListeners = []
        this.model = model;
        this.enqueueSnackbar = enqueueSnackbar;
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
    
                this.enqueueSnackbar("Failed to create " + object + "\n" + "error: " + res.data.error,
                    {
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                        variant: 'error'
                    });
    
                cb(res.data.error)
    
            } else {
    
                this.enqueueSnackbar("Created " + object + " successfully!",
                    {
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        },
                        variant: 'success'
                    });
    
                console.log("success", res)

                for(var i in this.addRequestSuccessListeners) {

                    this.addRequestSuccessListeners[i](res)
                }

                cb("")
            }
    
        }).catch((err) => {
    
            this.enqueueSnackbar("Failed to create " + object + " :(",
                {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                    variant: 'error'
                });
    
            console.log("error", err)
    
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