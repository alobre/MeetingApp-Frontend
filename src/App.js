import './App.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import AppBar from './components/AppBar';
import HomeScreen from './routes/Home';
import LoginScreen from './routes/Login';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {

  return (
      <div>
        <AppBar />
        {/* <LoginScreen/> */}
      </div>
  );
}

export default App;
