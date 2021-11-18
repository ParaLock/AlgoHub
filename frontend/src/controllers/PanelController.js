import {updateUser} from "../model/Model";
import {setPanelVisibility} from "../model/ViewModel";
import {store} from "../model/ModelProxy";

export default class PanelController {

    constructor(model) {

        this.model = model;
    }


    togglePanel(name, state = null) {

        store.dispatch(setPanelVisibility({name: name, state: state}));
    }
}