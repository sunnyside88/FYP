import {Card,Button,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import Sidebar from '../../components/nav/Sidebar';
import Header from '../../components/nav/Header';
const Home = () =>{
  return(
    <div className="container-fluid p-0">
        <div className="row no-gutters">
        <div className="col-2">
            <Sidebar></Sidebar>
        </div>
        <div className="col">
            <Header></Header>
        </div>
        </div>
    </div>
);
  }
  
export default Home;