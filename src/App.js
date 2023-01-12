import './App.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import HomeScreen from './components/Screens/HomeScreen';
import LoginScreen from './components/Screens/LoginScreen';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const user = useState(false)

  return (
    <div>
      <LoginScreen/>
    </div>
  );
}

export default App;
