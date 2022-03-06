import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login.js'
import Register from './pages/auth/Register.js'
import Home from './pages/auth/Home.js'
import { auth } from "./firebase.js";
import RegisterComplete from "./pages/auth/RegisterComplete.js";
import { useHistory } from "react-router";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import Listing from "./pages/product/ProductListing.js";
import ProductForm from "./pages/product/ProductForm.js";
import InvoiceForm from "./pages/invoices/InvoiceForm.js"
import CartForm from "./pages/pos/CartForm"
import PayMethodList from "./pages/others/PayMethodList.js";
import ContactListing from "./pages/contacts/ContactListing.js";
import InvoiceListing from "./pages/invoices/InvoiceListing.js";
import PaymentList from "./pages/payments/PaymentList.js";
import LocationList from "./pages/inventory/LocationList.js";

const App = () =>{
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type:"LOGGED_IN_USER",
          payload:{
            email:user.email,
            token:idTokenResult.token,
          },
        });
      }
    });
    return () => unsubcribe();
  },[])

  return(
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/inventory/locations' component={LocationList}/>
        <Route exact path='/sales/pos' component={CartForm}/>
        <Route exact path='/sales/invoices' component={InvoiceListing}/>
        <Route exact path='/sales/payments' component={PaymentList}/>
        <Route exact path='/sales/invoices/:id' component={InvoiceForm}/>
        <Route exact path='/others/pay_methods' component={PayMethodList}/>
        <Route exact path='/others/contacts' component={ContactListing}/>
        <Route exact path='/products' component={Listing}/>
        <Route exact path='/products/:id' component={ProductForm}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/register/complete' component={RegisterComplete}/>
      </Switch>
      <ToastContainer autoClose={4000}/>
    </div>
    
  );
};

export default App;
