import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import {ExpensesContextProvider} from './store/expenses-context'
import {EntriesContextProvider} from './store/entries-context'
import {ExpensesDetailContextProvider} from './store/expenses-detail-context';
import {ExpensesDrawerContextProvider} from './store/expenses-drawer-context';
import {MenuDrawerContextProvider} from './store/menu-drawer-context'
import {EntriesDrawerContextProvider} from './store/entries-drawer-context';
import {EntriesDetailContextProvider} from './store/entries-detail-context';
import { EntriesUpdateContextProvider } from './store/entries-update-context';
import { ThemeProvider, createTheme } from '@mui/material';
import { ExpensesUpdateContextProvider } from './store/expenses-update-context';
const theme = createTheme({})

ReactDOM.render(

  <ThemeProvider theme={theme}>
    <ExpensesContextProvider>
      <EntriesContextProvider>
        <ExpensesDetailContextProvider>
          <ExpensesDrawerContextProvider>
            <EntriesDrawerContextProvider>
              <EntriesDetailContextProvider>
                <EntriesUpdateContextProvider>
                  <ExpensesUpdateContextProvider>
                    <MenuDrawerContextProvider>
                      <React.StrictMode>
                        <App />
                      </React.StrictMode>
                    </MenuDrawerContextProvider>
                  </ExpensesUpdateContextProvider>
                </EntriesUpdateContextProvider>
              </EntriesDetailContextProvider>
            </EntriesDrawerContextProvider>
          </ExpensesDrawerContextProvider>
        </ExpensesDetailContextProvider>
      </EntriesContextProvider>
    </ExpensesContextProvider>
  </ThemeProvider>


  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
