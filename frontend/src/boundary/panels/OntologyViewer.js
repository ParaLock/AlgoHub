import React, { useState, useReducer } from 'react';
import Tree from '../../lib/tree-view/index';

import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const treeStyles = {

    color: 'black',
    fill: 'black',
    fontSize: "10pt",
    width: '100%',
    marginLeft: "15px"
  }


//Credit for recursion: https://betterprogramming.pub/recursive-rendering-with-react-components-10fa07c45456 

function getOntology(ontologyData) {

    if(ontologyData) {

        return ontologyData.map((item) => ({
            ...item,
            hasChildren: ontologyData.filter((i) => i.parentId === item.id).length > 0,
        }));
    } else {

        return []
    }

}


function TreeWrapper({ enableRemove, expandedOntologyItems, onSelect, selected, treeData, parentId = 0, level = 0 }) {

    const items = treeData
    .filter((item) => item.parentId == parentId)
    .sort((a, b) => (a.name > b.name ? 1 : -1));


    if (!items.length) return null;

    return (
        <>
            
            {items.map((item, idx) => {


                var style = treeStyles;

                var key = level + item.parentId + "." + item.id;
                
                if(item.hasChildren) {

                    return <Tree 
                                selected={selected} 
                                enableRemove={enableRemove}
                                content={item.name} 
                                style={{...style, color:"#6652ff"}} 
                                key={key}
                                item={item}
                                onSelect={(i) => onSelect(i)}
                                expandedOntologyItems={expandedOntologyItems} 
                            >
                                <TreeWrapper 
                                                enableRemove={enableRemove}
                                                expandedOntologyItems={expandedOntologyItems} 
                                                onSelect={(i) => onSelect(i)} 
                                                selected={selected} 
                                                treeData={treeData} 
                                                parentId={item.id} 
                                                level={level + 1} 
                                />
                        </Tree>

                } else {
                    
                    return <Tree 
                                    enableRemove={enableRemove}
                                    onSelect={(i) => onSelect(i)} 
                                    item={item}
                                    selected={selected} 
                                    content={item.name} 
                                    style={style} 
                                    key={key}
                                    expandedOntologyItems={expandedOntologyItems} 
                            />
                }
            })}
        
        </>
    );
}

export default function OntologyViewer(props) {


    return (
        <div>
            <TreeWrapper 
                        expandedOntologyItems={props.model.expandedOntologyItems} 
                        onSelect={(item) => props.onSelect(item)} 
                        enableRemove={props.enableRemove}
                        selected={props.model.selectedOntologyItem} 
                        treeData={getOntology(props.model.ontologyHierarchy)}
            />
        </div>
    );
}
