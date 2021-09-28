
import React, { useState } from 'react';
import styled from 'styled-components';

const OntologySidebarWrapper = styled.div`
    user-select: none;
    width: 25%;
    height: 100%;
    background-color: #f0f0f0;
    max-width: ${props => props.open ? "25%" : "0%"};
    transform: ${props => props.open ? "translateX(0%)" : "translateX(100%)"};
    transition: transform 250ms ease-in-out, max-width 250ms;
    overflow:hidden;
    border-radius: 0px 10px 10px 5px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    margin-top: 3px;
`;

export default function OntologySidebar(props) {
    
    return (

        <OntologySidebarWrapper open={props.open}>
            Benchmarks here
        </OntologySidebarWrapper>
    )
}