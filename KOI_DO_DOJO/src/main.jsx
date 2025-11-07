import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from '../src/Routes/Routing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing />
  </StrictMode>,
)
