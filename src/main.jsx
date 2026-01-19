import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HeroGuessGame from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <>
    <HeroGuessGame />
  </>,
)
