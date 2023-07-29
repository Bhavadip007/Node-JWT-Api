import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App ()
{
  return (
    <div className="App">
      <ToastContainer />
   <Login/>
    </div>
  );
}

export default App;
