import './App.css';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './boundary/Header';
import OntologySidebar from './boundary/sidebars/OntologySidebar';
import BenchmarkSidebar from './boundary/sidebars/BenchmarkSidebar';

import AlgorithmPanel from './boundary/panels/AlgorithmPanel';
import ProblemInstancePanel from './boundary/panels/ProblemInstancePanel';

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

  return (

    <Wrapper>

      <Header 
              onClickOntologyMenu={() => {setIsOntologyMenuOpen(!isOntologyMenuOpen) }}
              onClickBenchmarkMenu={() => { setIsBenchmarkMenuOpen(!isBenchmarkMenuOpen)}}
      />

      <ContentWrapper>

          <OntologySidebar  open={isOntologyMenuOpen}/>
            <InnerContentWrapper>

              <AlgorithmPanel>TEST</AlgorithmPanel>
              <ProblemInstancePanel>TEST</ProblemInstancePanel>

            </InnerContentWrapper>
          <BenchmarkSidebar open={isBenchmarkMenuOpen}/>

      </ContentWrapper>

    </Wrapper>
  );
}

export default App;
