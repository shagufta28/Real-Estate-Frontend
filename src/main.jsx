import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'swiper/swiper-bundle.min.css';
import {Auth0Provider} from '@auth0/auth0-react'
import { redirect } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
     domain="realestate-project.us.auth0.com"
      clientId='DJrqIOYaIiBJnLjZ725dZSlfn01IPidI' 
      authorizationParams={{redirect_uri:"http://localhost:5173"}} 
      audience='https://real-estate-backend-ut61.onrender.com' 
      scope='openid profile email'>
        <MantineProvider
  theme={{
    colorScheme: 'light', // or 'dark'
    // other theme customizations
  }}
>
  <App />
</MantineProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
