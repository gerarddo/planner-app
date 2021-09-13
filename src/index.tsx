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
ReactDOM.render(

    <ExpensesContextProvider>
      <EntriesContextProvider>
        <ExpensesDetailContextProvider>
          <ExpensesDrawerContextProvider>
              <EntriesDrawerContextProvider>
                <EntriesDetailContextProvider>
                  <MenuDrawerContextProvider>
                    <React.StrictMode>
                      <App />
                    </React.StrictMode>
                  </MenuDrawerContextProvider>
                </EntriesDetailContextProvider>
              </EntriesDrawerContextProvider>
          </ExpensesDrawerContextProvider>
        </ExpensesDetailContextProvider>
      </EntriesContextProvider>
    </ExpensesContextProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
