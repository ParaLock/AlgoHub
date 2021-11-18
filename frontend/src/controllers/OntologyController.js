import { expandParents } from "../boundary/common/Common";
import axios from 'axios';
import {Config} from "../boundary/common/Config"

export default class OntologyController {

    constructor(model, requestService) {

        this.model = model;
        this.requestService = requestService;

        this.model.selectedItem["algorithm"] = null;
        this.model.selectedItem["classification"] = null;
        this.model.selectedItem["benchmark"] = null;
        this.model.selectedItem["problem_instance"] = null;
        this.model.selectedItem["classification"] = null;
        
    }


    selectOntologyItem(item) {

        this.model.selectedOntologyItem = item;
        this.model.selectedItem[item.typeName] = null;

        var temp = {...this.model.expandedOntologyItems}
        expandParents(temp, this.model.classificationHierarchy, item);

        this.model.expandedOntologyItems = temp;

        var endpoint = item.typeName + "s/";
        
        this.requestService.executeGetRequest((err, data) => {
            if(err.length == 0)
                this.model.selectedItem[item.typeName] = data;
          }, endpoint + item.id) 

    }

    updateOntology(cb = null) {

        this.model.ontologyHierarchy = null;

        axios.get(Config.API_PATH + `classifications/hierarchy`)
            .then(res => {

                console.log(res.data)

                if (res.data && res.data.hierarchy) {

                    res.data.hierarchy = res.data.hierarchy.map((item) => {

                        if (!item.parentId)
                            item.parentId = ""

                        return item;

                    })

                    this.model.ontologyHierarchy = [...res.data.hierarchy];

                    if (cb) {
                        cb(res.data.hierarchy)
                    }

                }
            })
    }

    getSelectedItemKey() {

        if(this.model.ontologyHierarchy) {

            var parent = this.model.ontologyHierarchy.filter((item) => item.id == this.model.selectedOntologyItem.parentId)[0];
            var title = "";
        
            if(parent) {
                title = parent.name;
            }
        
            if(this.model.selectedOntologyItem && this.model.selectedOntologyItem.name) {
                title += "." + this.model.selectedOntologyItem.name;
            }

            return title;
        }

        return "Welcome to Algohub";

    }

    getSelectedType() {

        return this.model.selectedOntologyItem.typeName;
    }

    expandItem(id) {

        this.updateOntology((newHierarchy) => {

            var hierarchyElement = newHierarchy.filter((item) => {

                return item.id == id;
            });

            if (hierarchyElement.length > 0) {

                var temp = { ...this.model.expandedOntologyItems }
                expandParents(temp, newHierarchy, hierarchyElement[0]);
                this.model.expandedOntologyItems = temp;
            }
        })
    }

}