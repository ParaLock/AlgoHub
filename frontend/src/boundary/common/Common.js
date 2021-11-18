
export function expandParents(expandedOntologyItems, ontology, hierarchyElement) {

    expandedOntologyItems[hierarchyElement.id] = true

    var parent = ontology.filter((item) => {
        return item.id == hierarchyElement.parentId;
    });

    if (parent.length == 1) {

        expandParents(expandedOntologyItems, ontology, parent[0])

    } else {

        expandedOntologyItems[hierarchyElement.id] = true
    }
}
