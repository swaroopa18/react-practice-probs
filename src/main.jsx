import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  aws_project_region: 'ap-southeast-2',
  aws_user_pools_id: 'ap-southeast-2_zuvWOntLI',
  aws_user_pools_web_client_id: '1f7l38n1c1malbrvj5gidp5l4r',
  oauth: {}
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
