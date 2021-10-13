import React from "react";
import {Switch,Route} from 'react-router-dom'

import Sidebar from './components/nav/Sidebar'
import Login from './pages/auth/Login.js'
import Register from './pages/auth/Register.js'

const App = () =>{
  return(
    <div>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </div>
    
  );
};

export default App;
