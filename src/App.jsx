import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Home from './home.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './Layout.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route index element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
