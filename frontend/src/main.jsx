import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Amplify } from 'aws-amplify'

// Amplify.configure({
//   Auth: {
//     identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
//     userPoolId: import.meta.env.VITE_USER_POOL_ID,
//     userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
//     region: import.meta.env.VITE_COGNITO_REGION
//   }
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
