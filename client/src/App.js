import './App.css';

import { Route, Routes } from 'react-router-dom';
import React from 'react';
import GuessSubmit from './1Pages/GuessSubmit';
import HelloWorld from './1Pages/HelloWorld';
import Upload from '../src/1ComponentsMain/Upload'


function App() {
  return (
    <div className="App">
      <Route path="/" component={HelloWorld} exact/>
      <Route path="/game" component={GuessSubmit} exact/>
      <Route path="/upload" component={Upload} exact/>
    </div>
  );
}

export default App;
