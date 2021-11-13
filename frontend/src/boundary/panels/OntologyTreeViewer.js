import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import debounce from 'lodash.debounce';

export default function OntologyTreeViewer(props) {

    const [network, setNetwork] = useState(null)
    const [graph, setGraph] = useState({
        nodes: [],
        edges: []
    });

    const options = {
        interaction: { hover: true },
        autoResize: true,
        physics: {
            enabled: false
        },
        layout: {
            hierarchical: {
                "direction": "UD",
                "sortMethod": "directed",
                "nodeSpacing": 150,
                "shakeTowards": "roots"
            }
        },
        edges: {
            color: "#000000"
        },
        height: "100%"
    };

    const debouncedFit = debounce((e) => {

        network.fit()
        console.log(network.body.container.clientHeight)
        network.moveTo({ offset: { y: - (0.5 * (network.body.container.clientHeight /  3)) } })

    }, 10)

    const getColor = (type)=> {

        if(type=="algorithm") {
            return "#43A047"
        }

        if(type=="classification") {

            return "#2196F3"
        }

        if(type=="implementation") {
            return "#F4511E"
            
        }
    }

    const getShape = (type)=> {

        if(type=="algorithm") {
            return "box"
        }

        if(type=="classification") {

            return "box"
        }

        if(type=="implementation") {
            return "circle"
            
        }
    }


    React.useEffect(() => {

        if(!props.ontologyData) {
            return;
        }

        console.log(props)
        var nodes = props.ontologyData.map((item) => {
            return {
                label: item.name,
                id: item.id,
                color: getColor(item.typeName),
                font: {
                    color: "white"  
                },
                shape: getShape(item.typeName)
            }
        });

        var edges = []

        for(var i in props.ontologyData) {

            var item = props.ontologyData[i];
            var parent = props.ontologyData.filter((p) => p.id == item.parentId);
            console.log(parent)
            if(parent.length > 0) {

                edges.push({
                    from: parent[0].id,
                    to: item.id
                })

            } else {

                edges.push({
                    from: "visjs_root_node",
                    to: item.id
                })
            }
        }

        nodes.push({
                    label: "root", 
                    id: "visjs_root_node",
                    color: getColor("classification"),
                    font: {
                        color: "white"  
                    },
                    shape: getShape("classification")
                })


        setGraph(
            {
                nodes: nodes,
                edges: edges
            }
        )

        debouncedFit()
    }, [props.ontologyData]);

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
        resize: function (event) {
            debouncedFit(event)
        }
    };
    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
                setNetwork(network)
            }}
        />

    );
}
