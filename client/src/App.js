import React, { createContext, useReducer } from 'react';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { initialState,reducer } from '../src/reducer/UseReducer';
import MockExam from './MockExam';

export const UserContext = createContext();

const App = () =>{

   // context api
   const [state,dispatch] = useReducer(reducer,initialState);
   

  return (
    
    <>
    <UserContext.Provider value ={{state, dispatch}}>
    
      <Navbar />
      
      <Routes>  
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    {/* <Route path="*" element={<Errorpage />} /> */}
    <Route path="/mock" element={<MockExam />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<Errorpage/>} />
    
    </Routes>
    </UserContext.Provider> 
     
    </>
  );
};

export default App;