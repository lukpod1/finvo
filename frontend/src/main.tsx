import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
