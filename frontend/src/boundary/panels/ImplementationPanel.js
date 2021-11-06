
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

import Amplify, { Auth, API, Storage } from 'aws-amplify';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import awsconfig from '../../aws-exports';



const Wrapper = styled.div`
  
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 5px;
    border-width: 1px;
    overflow-wrap: anywhere;
    margin: 5px;
    margin-bottom: 0px;
    display: flex;
    flex-grow: 1;
    height: 100%;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`

    padding-right: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: right;

`;

export default function ImplementationPanel(props) {

    const [sourceCode, setSourceCode] = useState("None")

    React.useEffect(() => {

        try {

            

        } catch(exception) {
            console.log("Failed to get file.")
        }


    }, [props.selectedImplementation]);

    console.log(props.selectedImplementation)

    var lang = (props.selectedImplementation) ? props.selectedImplementation.name.toLowerCase() : "text"

    return (

        <Wrapper>
            <SyntaxHighlighter language={lang} customStyle={{height: "100%", margin: "0px", display: "flex", backgroundColor: "white"}} style={{ ...docco}}>
                    {`
let root1, root2;

// take input from the user
let a = prompt("Enter the first number: ");
let b = prompt("Enter the second number: ");
let c = prompt("Enter the third number: ");

// calculate discriminant
let discriminant = b * b - 4 * a * c;

// condition for real and different roots
if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    // result
}

// condition for real and equal roots
else if (discriminant == 0) {
    root1 = root2 = -b / (2 * a);

    // result
                    }`}
                </SyntaxHighlighter>

                
                <ButtonWrapper>
                    <Button size="small" variant="contained" >DOWNLOAD</Button>
                </ButtonWrapper>

        </Wrapper>
  );
}

