import { expandParents } from "../boundary/common/Common";
import axios from 'axios';
import {Config} from "../boundary/common/Config"
import { useSelector, useDispatch } from 'react-redux'
import store from '../model/ModelProxy';
import {
        updateSelectedOntologyItem,
        updateSelectedItem,
        updateExpanded,
} from "../model/ViewModel";

import {
    updateOntology
} from "../model/Model";

import history from "../boundary/common/History"

export default class OntologyController {

    constructor(requestService) {

        this.requestService = requestService;
    }

    getInitiallySelected() {

        var model = store.getState().model;
        
        if(!model.ontologyHierarchy)
            return null;
        
        var currentUrlParams = new URLSearchParams(window.location.search);
        var id = currentUrlParams.get('selected');
        var model = store.getState().model;
        var item = null;
        var candidates = model.ontologyHierarchy.filter((val) => val.id == id);

        if(candidates.length > 0) {
            item = candidates[0];
        }

        return item;
    }

    setInitiallySelected(id) {

        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('selected', id);
        history.push(window.location.pathname + "?" + currentUrlParams.toString());
    }

    selectOntologyItem(item, excludedEndpoints = ["classifications/"]) {

        this.setInitiallySelected(item.id)

        var model = store.getState().model;
        var viewModel = store.getState().viewModel;

        store.dispatch(updateSelectedOntologyItem(
            {
                item: item,
                ontology: model.ontologyHierarchy
            }
        ));

        store.dispatch(updateSelectedItem(
            {
                name: item.typeName,
                item: null
            }
        ));

        var temp = {...viewModel.expandedOntologyItems}
        expandParents(temp, model.ontologyHierarchy, item);
        store.dispatch(updateExpanded(temp));

        var endpoint = item.typeName + "s/";

        if(excludedEndpoints.includes(endpoint)) {
            return;
        }

        this.requestService.executeGetRequest((err, res) => {

            if(err.length == 0) {

                store.dispatch(updateSelectedItem(
                    {
                        name: item.typeName,
                        item: res
                    }
                ));

            }
          }, endpoint + item.id) 

    }

    updateOntology(cb = null) {

        store.dispatch(updateOntology(null));

        axios.get(Config.API_PATH + `classifications/hierarchy`)
            .then(res => {

                console.log(res.data)

                if (res.data && res.data.hierarchy) {

                    res.data.hierarchy = res.data.hierarchy.map((item) => {

                        if (!item.parentId)
                            item.parentId = ""

                        return item;

                    })

                    store.dispatch(updateOntology(res.data.hierarchy));

                    if (cb) {
                        cb(res.data.hierarchy)
                    }

                }
            })
    }

    expandItem(id) {

        this.updateOntology((newHierarchy) => {

            var hierarchyElement = newHierarchy.filter((item) => {

                return item.id == id;
            });

            if (hierarchyElement.length > 0) {

                var model = store.getState().model;
                var temp = {...model.expandedOntologyItems}
                expandParents(temp, newHierarchy, hierarchyElement[0]);
                store.dispatch(updateExpanded(temp));
            }
        })
    }

}