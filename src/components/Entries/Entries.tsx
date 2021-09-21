import React, { useEffect, useRef, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import EntriesList from './EntriesList/EntriesList';
import EntryDrawer from '../EntryDrawer/EntryDrawer'
import EntriesContext from '../../store/entries-context';
import MenuDrawerContext from '../../store/menu-drawer-context';
import {EntryControllerApi} from '../../api'
import * as XLSX from 'xlsx';
import { Grid, IconButton } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
import { CSVLink } from 'react-csv'
function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  }
}));


export default function Entries() {

    const today = new Date()
    const pageCount = today.getMonth()+1
    const [fetchMonth, setFetchMonth] = useState(1);
    const [page, setPage] = useState(pageCount);
    const classes = useStyles();
    const ctx = useContext(EntriesContext);
    const menuCtx = useContext(MenuDrawerContext);
    const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
    const entryController = new EntryControllerApi();
    const [transactionData, setTransactionData] = useState([])

    useEffect(() => {
        ctx.updateEntries()
        menuCtx.updateTabTitle('All Entries')
    }, [ctx.fetchMonth]);

    function monthEntriesUpdate(ev: object, pageNum: number){
        ctx.updateFetchMonth(pageNum - 1)
        setFetchMonth(pageNum - 1)
        setPage(pageNum)
    }

    function onHandleDownload(){
      entryController.entryControllerDownloadCsv().then((response: any) => {
        setTransactionData(response.data)
        if (csvLinkRef?.current) {
          csvLinkRef.current.link.click();
        }
      })
    }

    function refreshPage() { window.location.reload()};
    // handle file upload
    const handleFileUpload = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        /* Parse data */
        let bstr: any = evt.target.result;
        const wb = XLSX.read(bstr, { 
            type: 'binary',   
            cellDates: true,
            cellNF: false,
            cellText: false
          }
        );
        /* Get first worksheet */
        const ws = wb.Sheets[wb.SheetNames[0]];
        /* Convert array of arrays */
        const records: any = XLSX.utils.sheet_to_json(ws, {raw: false, dateNF:'yyyy-mm-dd'}).map((record: any) => {
          record.inflow = parseFloat(record.inflow)
          record.outflow = parseFloat(record.outflow)
          return record
        });
        entryController.entryControllerCreateAll(records).then((response:any) => {
          refreshPage() 
        })
      };
      reader.readAsBinaryString(file);
    }

    return(
        <React.Fragment>
          <Grid container >
            <Grid item xs={6}>
              <div>
                <p>Upload CSV file</p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            <IconButton aria-label="delete" onClick={onHandleDownload}>
                <DownloadIcon />
              </IconButton>
                <CSVLink
                  data={transactionData}
                  filename='entries.csv'
                  className='hidden'
                  ref={csvLinkRef}
                  target='_blank'
                />
            </Grid>
          </Grid>
          <Grid container style={{marginTop : 20}}>
            <br />
            <Pagination page={page} count={pageCount} color="secondary" onChange={monthEntriesUpdate}/>
            <EntriesList year={2021} month={fetchMonth}></EntriesList>
            <div className={classes.seeMore}>
                <div className={classes.root}>
                    <Pagination page={page} count={pageCount} color="secondary" onChange={monthEntriesUpdate}/>
                </div>
                <Link color="primary" href="#" onClick={preventDefault}>
                See more Entries 
                </Link>
            </div> 
            <EntryDrawer></EntryDrawer>
            </Grid> 
        </React.Fragment>
    )
}