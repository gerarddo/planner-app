import React, { useRef, useState } from 'react';
import {EntryControllerApi} from '../../../../api'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CSVLink } from 'react-csv'
import { IconButton } from '@mui/material';

export default function EntriesDownloadButton() {

    const [transactionData, setTransactionData] = useState([])

    const entryController = new EntryControllerApi();
    const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    function onHandleDownload(){
        entryController.entryControllerDownloadCsv().then((response: any) => {
          setTransactionData(response.data)
          if (csvLinkRef?.current) {
            csvLinkRef.current.link.click();
          }
        })
      }

    return (
        <div>
            <IconButton aria-label="delete" onClick={onHandleDownload}>
                <CloudDownloadIcon />
            </IconButton>
            <CSVLink
                data={transactionData}
                filename='entries.csv'
                className='hidden'
                ref={csvLinkRef}
                target='_blank'
            />
        </div>
    );
  }
  