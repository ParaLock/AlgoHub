import './App.css';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './boundary/Header';
import OntologySidebar from './boundary/sidebars/OntologySidebar';
import BenchmarkSidebar from './boundary/sidebars/BenchmarkSidebar';

import AlgorithmPanel from './boundary/panels/AlgorithmPanel';
import ProblemInstancePanel from './boundary/panels/ProblemInstancePanel';

import ClassificationForm from './boundary/forms/ClassificationForm';
import ClassificationMergeForm from './boundary/forms/ClassificationMergeForm';
import AlgorithmRankingPanel from './boundary/panels/AlgorithmRankingPanel';

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
    height: 100%;
    flex-direction: column;


`;

function App() {

  const [isOntologyMenuOpen, setIsOntologyMenuOpen] = useState(false);
  const [isBenchmarkMenuOpen, setIsBenchmarkMenuOpen] = useState(false);

  const [openForm, setOpenForm] = useState("");
  
  return (


    <Wrapper>

      <Header 
              onClickOntologyMenu={() => {setIsOntologyMenuOpen(!isOntologyMenuOpen) }}
              onClickBenchmarkMenu={() => { setIsBenchmarkMenuOpen(!isBenchmarkMenuOpen)}}
      />

      <ContentWrapper>

          <OntologySidebar  
                          open={isOntologyMenuOpen}
                          onOntologyAdd={() => setOpenForm("classification")}
                          onOntologyMerge={() => setOpenForm("classification_merge")}
                          onOntologyReport={() => setOpenForm("algorithm_ranking_panel")}
          />
            <InnerContentWrapper>

              <AlgorithmPanel/>
              <ProblemInstancePanel/>

            </InnerContentWrapper>
          <BenchmarkSidebar open={isBenchmarkMenuOpen}/>

      </ContentWrapper>

      <ClassificationForm 
                          open={openForm == "classification"}
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


    </Wrapper>
  );
}

export default App;
