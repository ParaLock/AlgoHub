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
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import { Resizable } from "re-resizable";

const Wrapper = styled.div`
      
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const ContentWrapper = styled.div`

    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;

`;

const InnerContentWrapper = styled.div`

    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
`;

const PanelTitle = styled.div`   
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 5px;
    padding: 1px;
    border-width: 1px;
    margin: 5px;
    display: flex;
    justify-content: center;
    
`;

const Seperator = styled.div`

    margin-top: 10px;

`;

export default function MainPage(props) {

    const [topPanelHeight, setTopPanelHeight] = useState(800);

    var title = props.ontologyController.getSelectedItemKey();

    return (

        <Wrapper>

            <Header
                model={props.model}
                authController={props.authController}
                formController={props.formController}
            />

            <ContentWrapper>

                <OntologySidebar
                    open={true}
                    model={props.model}
                    formController={props.formController}
                    ontologyController={props.ontologyController}
                />
                <InnerContentWrapper>
                    <PanelTitle>

                        <Typography variant="h6" align="center" component="div" gutterBottom>
                            {title}
                        </Typography>
                    </PanelTitle>



                    {props.ontologyController.getSelectedType() == "algorithm" && <Resizable
                        enable={{
                            top: false,
                            right: false,
                            bottom: true,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false
                        }}
                        size={{ height: topPanelHeight }}
                        onResizeStop={(e, direction, ref, d) => {
                            setTopPanelHeight(topPanelHeight + d.height)
                        }}
                    >
                        <AlgorithmPanel
                            ontologyController={props.ontologyController}
                        />
                    </Resizable>}

                    {props.ontologyController.getSelectedType() == "implementation" && <Resizable
                        enable={{
                            top: false,
                            right: false,
                            bottom: true,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false
                        }}
                        size={{ height: topPanelHeight }}
                        onResizeStop={(e, direction, ref, d) => {
                            setTopPanelHeight(topPanelHeight + d.height)
                        }}
                    >
                        <ImplementationPanel
                            ontologyController={props.ontologyController}
                        />

                    </Resizable>}
                    <Seperator />
                    {props.ontologyController.getSelectedType() == "implementation" &&
                        <ProblemInstancePanel
                            formController={props.formController}
                            ontologyController={props.ontologyController}
                            model={props.model}
                        />
                    }


                </InnerContentWrapper>
                <BenchmarkSidebar
                    open={props.panelController.panelOpen("benchmark_menu")}
                    model={props.model}
                    panelController={props.panelController}
                />

            </ContentWrapper>

            <ClassificationForm
                open={props.panelController.panelOpen("classification_form")}
                onClose={() => props.panelController.togglePanel("classification_form", false)}
                model={props.model}
                requestService={props.requestService}
                onSubmit={props.addClassification}
            />

            <ProblemInstanceForm
                open={props.panelController.panelOpen("problem_instance_form")}
                onClose={() => props.panelController.togglePanel("problem_instance_form", false)}
                model={props.model}
                requestService={props.requestService}
            />

            <ClassificationMergeForm
                open={props.panelController.panelOpen("classification_merge_form")}
                onClose={() => props.panelController.togglePanel("classification_merge_form", false)}
                model={props.model}
                requestService={props.requestService}
            />

            <AlgorithmRankingPanel
                open={props.panelController.panelOpen("algorithm_ranking_panel")}
                onClose={() => props.panelController.togglePanel("algorithm_ranking_panel", false)}
                model={props.model}
                requestService={props.requestService}
            />

            <BenchmarkForm
                open={props.panelController.panelOpen("benchmark_add_form")}
                onClose={() => props.panelController.togglePanel("benchmark_add_form", false)}
                model={props.model}
                requestService={props.requestService}
            />

            <AlgorithmForm
                open={props.panelController.panelOpen("algorithm_form")}
                onClose={() => props.panelController.togglePanel("algorithm_form", false)}
                requestService={props.requestService}
                model={props.model}
                requestService={props.requestService}
            />

            <ImplementationForm

                open={props.panelController.panelOpen("implementation_form")}
                onClose={() => props.panelController.togglePanel("implementation_form", false)}
                model={props.model}
                requestService={props.requestService}
            />

            <AlgorithmReclassifyForm

                open={props.panelController.panelOpen("algorithm_reclassify_form")}
                onClose={() => props.panelController.togglePanel("algorithm_reclassify_form", false)}
                model={props.model}
                requestService={props.requestService}
            />

        </Wrapper>
    );

}