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

  
const ontologyData = [

    { id: 1, content: "Algorithms", parentId: 0, type: "classification"},
    { id: 2, content: "Sorting", parentId: 1, type: "classification"},
    { id: 3, content: "Computational Geometry", parentId: 1, type: "classification"},
    { id: 4, content: "Nearest Neighbor", parentId: 3, type: "algorithm"},
    { id: 5, content: "Convex Hull", parentId: 3, type: "algorithm"},
    { id: 6, content: "Graph Algorithms", parentId: 1, type: "classification"},
    { id: 7, content: "Search", parentId: 6, type: "classification"},
    { id: 8, content: "Breadth-First Search", parentId: 7, type: "algorithm"},
    { id: 9, content: "Depth-First Search", parentId: 7, type: "algorithm"},
    { id: 10, content: "C++", parentId: 9, type: "implementation"},
    { id: 11, content: "Java", parentId: 9, type: "implementation"}

]



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
    height: 100%;
    width: 100%;
    flex-direction: column;
`;

const PanelTitle = styled.div`   
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 5%;
    border-radius: 25px;
    font-size: 25pt;
    border-width: 1px;
    margin: 5px;
    display: flex;
    justify-content: center;
    
`;

export default function MainPage() {

    const [isOntologyMenuOpen, setIsOntologyMenuOpen] = useState(false);
    const [isBenchmarkMenuOpen, setIsBenchmarkMenuOpen] = useState(false);
  
    const [openForm, setOpenForm] = useState("");

    const [selectedOntologyItem, setSelectedOntologyItem] = useState({});
    
    var parent = ontologyData[selectedOntologyItem.parentId - 1];
    var title = "";

    if(parent) {
        title = parent.content;
    }

    if(selectedOntologyItem.content) {
        title += " - " + selectedOntologyItem.content;
    } else {
        title = "Welcome to AMA"   
    }

    return (


        <Wrapper>

            <Header
                onClickOntologyMenu={() => { setIsOntologyMenuOpen(!isOntologyMenuOpen) }}
                onClickBenchmarkMenu={() => { setIsBenchmarkMenuOpen(!isBenchmarkMenuOpen) }}
            />

            <ContentWrapper>

                <OntologySidebar
                    open={isOntologyMenuOpen}
                    onClassificationAdd={() => setOpenForm("classification_form")}
                    onOntologyMerge={() => setOpenForm("classification_merge")}
                    onAlgorithmAdd={() => setOpenForm("algorithm_form")}
                    onImplementationAdd={() => setOpenForm("implementation_form")}
                    onOntologyReport={() => setOpenForm("algorithm_ranking_panel")}
                    onAlgorithmReclassify={() => setOpenForm("algorithm_reclassify_form")}
                    selectedOntologyItem={selectedOntologyItem}
                    onOntologyItemSelected={(item) => setSelectedOntologyItem(item)}
                    ontologyData={ontologyData}
                />
                <InnerContentWrapper>

                    <PanelTitle>
                        {title}
                    </PanelTitle> 

                    { selectedOntologyItem.type == "algorithm" && <AlgorithmPanel 
                                                                                    selectedAlgorithm={selectedOntologyItem} 
                                                                                    title={selectedOntologyItem.content}
                                                                    /> }
                    { selectedOntologyItem.type == "classification" && <AlgorithmPanel 
                                                                                    selectedAlgorithm={selectedOntologyItem} 
                                                                                    title={selectedOntologyItem.content}
                                                                    /> }
                    { selectedOntologyItem.type == "implementation" && <ImplementationPanel 
                                                                                    selectedAlgorithm={selectedOntologyItem} 
                                                                                    title={selectedOntologyItem.content}
                                                                        /> }

                    <ProblemInstancePanel />

                </InnerContentWrapper>
                <BenchmarkSidebar
                    open={isBenchmarkMenuOpen}
                    onBenchmarkAdd={() => setOpenForm("benchmark_form")}
                />

            </ContentWrapper>

            <ClassificationForm
                open={openForm == "classification_form"}
                onClose={() => setOpenForm("")}
            />

            <ClassificationMergeForm
                open={openForm == "classification_merge"}
                onClose={() => setOpenForm("")}
            />

            <AlgorithmRankingPanel
                open={openForm == "algorithm_ranking_panel"}
                onClose={() => setOpenForm("")}
            />

            <BenchmarkForm
                open={openForm == "benchmark_form"}
                onClose={() => setOpenForm("")}
            />

            <AlgorithmForm
                open={openForm == "algorithm_form"}
                onClose={() => setOpenForm("")}
            />

            <ImplementationForm
                open={openForm == "implementation_form"}
                onClose={() => setOpenForm("")}
            />

            <AlgorithmReclassifyForm
                open={openForm == "algorithm_reclassify_form"}
                onClose={() => setOpenForm("")}
            />

        </Wrapper>
    );

}