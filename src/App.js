import React, { useEffect} from 'react';
import { Switch, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Header from './Components/Nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import {auth} from './firebase';
import { useDispatch } from 'react-redux';

const App = () => { 

  const dispatch = useDispatch();

  useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged(async ( user ) => {
   if(user) {
     const idTokenResult = await user.getIdTokenResult();
     console.log("user", user);

     dispatch({
       type: 'LOGGED_IN_USER',
       payload: {
         email: user.email,
         token: idTokenResult.token,
       }
     });
   }
 });
 return () => unsubscribe();
  },[]);

  return (
    <>
    <Header/>
      <ToastContainer/>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/register/complete' component={RegisterComplete} />
      <Route exact path='/forgot/password' component={ForgotPassword} />
      <Route exact  path='/login' component={Login} />
      </Switch>
      </>
  )
}
          


export default App;
