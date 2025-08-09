import React from 'react'
import Header from './components/header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />

    </BrowserRouter>
    </>
  )
}

export default App