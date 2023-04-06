import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './routes/Home';
import Login from './routes/Login';
import Notification from './routes/Notification';
import CreateMeeting from './routes/CreateMeeting';
import Search from './routes/Search';
import ReactDOM from 'react-dom';
import AppBar from './components/AppBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/Login",
//     element: <Login/>,
//   },
// ]);

function App() {

  return (
      <div>
        <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateMeeting" element={<CreateMeeting />} />
          <Route path="/Notification" element={<Notification />} />
        </Routes>
        {/* <RouterProvider router={router} /> */}
        </Router>
      </div>
  );
}

export default App;
