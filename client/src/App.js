import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import GuessSubmit from './1Pages/GuessSubmit';
import HomePage from './1Pages/HomePage';
import Register from './1ComponentsMain/Register'
import AdminUploadHint from './1Pages/AdminUploadHint'


function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/game" component={GuessSubmit} exact/>
      {/* <Route path="/upload" component={Register} exact/> */}
      <Route path="/admin/upload" component={AdminUploadHint} exact/>
    </div>
  );
}

export default  App;
