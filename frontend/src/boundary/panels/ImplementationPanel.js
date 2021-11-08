
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Amplify, { Auth, API, Storage } from 'aws-amplify';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import awsconfig from '../../aws-exports';
import {Config} from "../common/Config"
import axios from 'axios';
import { saveAs } from "file-saver";
import fileDownload from 'js-file-download'

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

    const [sourceCode, setSourceCode] = useState("")
    const [loadingFile, setLoadingFile] = useState(false)
    const [fileCache, setFileCache] = useState({});

    React.useEffect(() => {

        setSourceCode("")
        setLoadingFile(true)

        var cache = {...fileCache}

        if(!props.selectedImplementation )
            return

        try {

            if(cache[props.selectedImplementation.filename] === undefined) {

                if(props.selectedImplementation.filename) {
                    axios.get(Config.S3_PATH + "implementations/" + props.selectedImplementation.filename)
                    .then(res => {
                        if(res.data) {
                            setSourceCode(res.data)
                            cache[props.selectedImplementation.filename] = res.data
                            setLoadingFile(false)
                        }
                    }).catch(() => {
                        setSourceCode("-Failed to retrieve implementation file")
                        setLoadingFile(false)
                    })
                }
            } else {

                setSourceCode(cache[props.selectedImplementation.filename])
                setLoadingFile(false)

            }

        } catch(exception) {

            setSourceCode("-Failed to retrieve implementation file")
            setLoadingFile(false)
        }

        setFileCache(cache)

    }, [props.selectedImplementation]);

    var lang = (props.selectedImplementation) ? props.selectedImplementation.programmingLanguage.toLowerCase() : "text"

    
    var handleDownload = (url, filename) => {
        axios.get(url, {
        responseType: 'blob',
        })
        .then((res) => {
        fileDownload(res.data, filename)
        })
  }

    return (

        <Wrapper>

            { (loadingFile || !props.selectedImplementation) && <CircularProgress /> }

                <SyntaxHighlighter language={lang} customStyle={{height: "100%", margin: "0px", display: "flex", backgroundColor: "white"}} style={{ ...docco}}>
                    {sourceCode}
                </SyntaxHighlighter>
            
                <ButtonWrapper>
                    <Button 
                            onClick={() => {
                                            var filename = Config.S3_PATH + "implementations/" + props.selectedImplementation.filename;
                                            
                                            if(filename) {
                                                handleDownload(filename,filename)
                                            }
                                            }} 
                            size="small" 
                            variant="contained" 
                    >DOWNLOAD</Button>
  
                </ButtonWrapper>

        </Wrapper>
  );
}

