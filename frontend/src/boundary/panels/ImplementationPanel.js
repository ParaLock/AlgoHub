
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
    height: 47.5%;
    border-radius: 5px;
    border-width: 1px;
    overflow-wrap: anywhere;
    margin: 5px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
`;

const CodeWrapper = styled.div`

    height: 100%;
    width: 100%;
`;

const ButtonWrapper = styled.div`

    padding-right: 10px;
    display: flex;
    justify-content: right;

`;

export default function ImplementationPanel(props) {

    const [sourceCode, setSourceCode] = useState("None")

    React.useEffect(() => {

        //Fetch s3 file

        // Storage.get('hello.png', {expires: 60})
        // .then(result => console.log(result))
        // .catch(err => console.log(err));

        // Storage.get('filename.txt', {
        //     download: true,
        //     progressCallback(progress) {
                
        //     }
        // })


    }, [props.selectedImplementation]);

    var lang = (props.selectedImplementation) ? props.selectedImplementation.name.toLowerCase() : "text"

    return (

        <Wrapper>
            <CodeWrapper>
            <SyntaxHighlighter language={lang} customStyle={{height: "100%", margin: "0px"}} style={{ ...docco}}>
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
            </CodeWrapper>

                
                <ButtonWrapper>

                    <Button size="small" variant="contained">DOWNLOAD</Button>
                </ButtonWrapper>

        </Wrapper>
  );
}

