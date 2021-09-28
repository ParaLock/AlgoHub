import * as React from 'react';
import Tree from '../../lib/tree-view/index';

import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const treeStyles = {

    color: 'black',
    fill: 'black',
    fontSize: "15pt",
    width: '100%',
    marginLeft: "15px"
  }


//Credit for recursion: https://betterprogramming.pub/recursive-rendering-with-react-components-10fa07c45456 

function getOntology(ontologyData) {
return ontologyData.map((item) => ({
    ...item,
    hasChildren: ontologyData.filter((i) => i.parentId === item.id).length > 0,
}));
}


function TreeWrapper({ onSelect, selected, treeData, parentId = 0, level = 0 }) {
const items = treeData
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.content > b.content ? 1 : -1));
if (!items.length) return null;
return (
    <>
        {items.map((item) => {

            var style = treeStyles;

            var key = level + item.parentId + item.content;

            if(item.hasChildren) {
                return <Tree 
                            selected={selected} 
                            content={item.content} 
                            style={{...style, color:"#6652ff"}} 
                            key={key}
                            uniqueId={key}
                            onSelect={(id) => onSelect(id)}
                        >
                            <TreeWrapper onSelect={(id) => onSelect(id)} selected={selected} treeData={treeData} parentId={item.id} level={level + 1} />
                    </Tree>

            } else {
                
                return <Tree 
                                onSelect={(id) => onSelect(id)} 
                                uniqueId={key}
                                selected={selected} 
                                content={item.content} 
                                style={style} 
                                key={key}
                        />
            }
        })}
       
    </>
);
}

export default function OntologyViewer(props) {

    return (
        <div>
            <TreeWrapper onSelect={(id) => props.onSelect(id)} selected={props.selected} treeData={getOntology(props.ontologyData)}/>
        </div>
    );
}
