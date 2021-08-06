import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import {ExpensesContextProvider} from './store/expenses-context'
import {EntriesContextProvider} from './store/entries-context'
import {DrawerContextProvider} from './store/drawer-context'
ReactDOM.render(
  <DrawerContextProvider>
    <ExpensesContextProvider>
      <EntriesContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </EntriesContextProvider>
    </ExpensesContextProvider>
  </DrawerContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
