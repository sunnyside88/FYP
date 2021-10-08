import React from "react";
import {Switch,Route} from 'react-router-dom'

import Login from './pages/auth/Login.js'
import Register from './pages/auth/Register.js'
import Home from './pages/Home.js'

const App = () =>{
  return(
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
  );
};

export default App;
