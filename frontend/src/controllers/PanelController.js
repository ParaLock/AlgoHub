import {updateUser} from "../model/Model";
import {setPanelVisibility} from "../model/ViewModel";
import store from "../model/ModelProxy";
import { useSelector, useDispatch } from 'react-redux';

export default class PanelController {

    constructor() {

    }

    panelOpen(name) {

        var openPanels = store.getState().viewModel.openPanels;

        return openPanels.includes(name);
    }

    togglePanel(name, state = null) {

        store.dispatch(setPanelVisibility({name: name, state: state}));
    }
}