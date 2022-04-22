import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import DelegatePage from './pages/delegate-page/delegate-page';
import CssBaseline from '@mui/material/CssBaseline';


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <DelegatePage />
  </React.StrictMode>,
  document.getElementById('root')
)
