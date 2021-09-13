import React, { useEffect, useState } from 'react';
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
    const entryController = new EntryControllerApi();

    useEffect(() => {
        ctx.updateEntries()
        menuCtx.updateTabTitle('All Entries')
    }, [ctx.fetchMonth]);

    function monthEntriesUpdate(ev: object, pageNum: number){
        ctx.updateFetchMonth(pageNum - 1)
        setFetchMonth(pageNum - 1)
        setPage(pageNum)
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
            <div>
              <p>Upload CSV file</p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
            </div>
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
        </React.Fragment>
    )
}