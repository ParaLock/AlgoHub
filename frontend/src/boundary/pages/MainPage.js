import '../../App.css';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import OntologySidebar from '../sidebars/OntologySidebar';
import BenchmarkSidebar from '../sidebars/BenchmarkSidebar';

import AlgorithmPanel from '../panels/AlgorithmPanel';
import ImplementationPanel from '../panels/ImplementationPanel';
import ProblemInstancePanel from '../panels/ProblemInstancePanel';

import ClassificationForm from '../forms/ClassificationForm';
import ClassificationMergeForm from '../forms/ClassificationMergeForm';
import AlgorithmRankingPanel from '../panels/AlgorithmRankingPanel';
import AlgorithmReclassifyForm from '../forms/AlgorithmReclassifyForm';
import BenchmarkForm from '../forms/BenchmarkForm';
import AlgorithmForm from '../forms/AlgorithmForm';
import ImplementationForm from "../forms/ImplementationForm"
import ProblemInstanceForm from '../forms/ProblemInstanceForm';



const Wrapper = styled.div`
      
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const ContentWrapper = styled.div`

    display: flex;
    width: 100%;
    height: 95%;
    flex-direction: row;

`;

const InnerContentWrapper = styled.div`

    display: flex;
    width: 100%;
    flex-direction: column;
`;

const PanelTitle = styled.div`   
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 25px;
    padding: 5px;
    font-size: 20pt;
    border-width: 1px;
    margin: 5px;
    display: flex;
    justify-content: center;
    
`;

export default function MainPage(props) {

    var parent = props.ontologyData[props.selectedOntologyItem.parentId - 1];
    var title = "";

    if(parent) {
        title = parent.content;
    }

    if(props.selectedOntologyItem.content) {
        title += "." + props.selectedOntologyItem.content;
    } else {
        title = "Welcome to AMA"   
    }

    var benchmarks = props.benchmarkData.filter((item) => item.parent == title);
    var problemInstances = props.problemInstanceData.filter((item) => {
        
        if(item.parent == props.selectedOntologyItem.content) {
            return true;
        }

        if(props.selectedOntologyItem.type == "implementation" && parent.content == item.parent) {

            return true;
        }   
    
    });

    return (


        <Wrapper>

            <Header
                onClickBenchmarkMenu={() => { props.toggleItem("benchmark_menu") }}
            />

            <ContentWrapper>

                <OntologySidebar
                    open={true}
                    onClassificationAdd={() => props.toggleItem("classification_form")}
                    onOntologyMerge={() => props.toggleItem("classification_merge")}
                    onAlgorithmAdd={() => props.toggleItem("algorithm_form")}
                    onImplementationAdd={() => props.toggleItem("implementation_form")}
                    onOntologyReport={() => props.toggleItem("algorithm_ranking_panel")}
                    onAlgorithmReclassify={() => props.toggleItem("algorithm_reclassify_form")}
                    selectedOntologyItem={props.selectedOntologyItem}
                    onOntologyItemSelected={(item) => props.setSelectedOntologyItem(item)}
                    ontologyData={props.ontologyData}
                    expandedOntologyItems={props.expandedOntologyItems}
                />
                <InnerContentWrapper>

                    <PanelTitle>
                        {title}
                    </PanelTitle> 

                    { props.selectedOntologyItem.type == "algorithm" && <AlgorithmPanel 
                                                                                    selectedAlgorithm={props.selectedOntologyItem} 
                                                                    /> }
                    { props.selectedOntologyItem.type == "classification" && <AlgorithmPanel 
                                                                                    selectedAlgorithm={props.selectedOntologyItem} 
                                                                    /> }
                    { props.selectedOntologyItem.type == "implementation" && <ImplementationPanel 
                                                                                    selectedAlgorithm={props.selectedOntologyItem} 
                                                                        /> }

                    <ProblemInstancePanel 
                        problemInstanceData={problemInstances}
                        onProblemInstanceAdd={() => props.toggleItem("problem_instance_form")}

                    />

                </InnerContentWrapper>
                <BenchmarkSidebar
                    open={props.toggleableItems.includes("benchmark_menu")}
                    onBenchmarkAdd={() => props.toggleItem("benchmark_add_form", true)}
                    benchmarks={benchmarks}
                />

            </ContentWrapper>

            <ClassificationForm
                open={props.toggleableItems.includes("classification_form")}
                onClose={() => props.toggleItem("classification_form", false)}
                ontologyData={props.ontologyData}
            />

            <ProblemInstanceForm
                open={props.toggleableItems.includes("problem_instance_form")}
                onClose={() => props.toggleItem("problem_instance_form", false)}
                ontologyData={props.ontologyData}
            />

            <ClassificationMergeForm
                open={props.toggleableItems.includes("classification_merge")}
                onClose={() => props.toggleItem("classification_merge", false)}
                ontologyData={props.ontologyData}
            />

            <AlgorithmRankingPanel
                open={props.toggleableItems.includes("algorithm_ranking_panel")}
                onClose={() => props.toggleItem("algorithm_ranking_panel", false)}
                ontologyData={props.ontologyData}
            />

            <BenchmarkForm
                open={props.toggleableItems.includes("benchmark_add_form")}
                onClose={() => props.toggleItem("benchmark_add_form", false)}
                ontologyData={props.ontologyData}
            />

            <AlgorithmForm
                open={props.toggleableItems.includes("algorithm_form")}
                onClose={() => props.toggleItem("algorithm_form", false)}
                ontologyData={props.ontologyData}
            />

            <ImplementationForm
                open={props.toggleableItems.includes("implementation_form")}
                onClose={() => props.toggleItem("implementation_form", false)}
                ontologyData={props.ontologyData}
            />

            <AlgorithmReclassifyForm
                open={props.toggleableItems.includes("algorithm_reclassify_form")}
                onClose={() => props.toggleItem("algorithm_reclassify_form", false)}
                ontologyData={props.ontologyData}
            />

        </Wrapper>
    );

}