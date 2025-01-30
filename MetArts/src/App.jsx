import { useState } from 'react'
import './App.css'
import SignLog from './SignLog'
import Signup from './SignLog'
import Drawing from './Drawing'
import { SavedDraw } from './savedDraw'
import { GraphDraw } from './GraphDraw'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Funchoose } from './Funchoose'
import SavedDrawColumn from './savedDrawColumn'

function App() {

  return (
     <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/Funchoose' element={<Funchoose/>}/>
        <Route path='/savedDraw' element={<SavedDraw/>}/>
        <Route path='/Drawing' element={<Drawing/>}/>
        <Route path='/GraphDraw' element ={<GraphDraw/>}/>
      </Routes>
     </Router>
  )
}

export default App
