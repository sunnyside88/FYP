import React, { useState } from 'react';
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