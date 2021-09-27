import React, { useRef, useState } from 'react';
import {ExpenseControllerApi} from '../../../../api'
import * as XLSX from 'xlsx';
import { UploadFileRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
export default function ExpensesUploadButton() {

    const expenseController = new ExpenseControllerApi();

    function refreshPage() { window.location.reload()};
    const hiddenFileInput = React.useRef(null);
    const handleClick = (event: any) => {
        if ( hiddenFileInput.current !== null ){
            // @ts-ignore
            hiddenFileInput.current.click();
        }
      };
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
          expenseController.expenseControllerCreateAll(records).then((response:any) => {
            refreshPage() 
          })
        };
        reader.readAsBinaryString(file);
      }

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClick}>
                <UploadFileRounded />
                <input
                    type="file"
                    ref={hiddenFileInput}
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    style={{display: 'none'}}
                    />
            </IconButton>


        </div>
    );
  }
  