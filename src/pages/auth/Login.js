import React, { useState , useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import {auth, googleAuthProvider} from '../../firebase';

import { toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';

import Button from '@material-ui/core/Button';
import { GoogleOutlined } from '@ant-design/icons';
import MailRoundedIcon from '@material-ui/icons/MailRounded';

import {Link} from 'react-router-dom';

import { Spin } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));

const Login = ({history}) => { 

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading , setLoading ] = useState(false);

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
      if(user && user.token) {
        history.push('/');
      }
    },[user])

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
         const result = await auth.signInWithEmailAndPassword(email, password);
         const {user} = result;
         const idTokenResult = await user.getIdTokenResult();

         dispatch({
             type:'LOGGED_IN_USER',
             payload: {
                 email: user.email,
                 token: idTokenResult.token,
             },
         });
         history.push('/')
        }
        catch(error) {
         console.log(error);
         toast.error(error.message);
         setLoading(false);
        }
        
    }//


    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        
    }
    const handleChangePassword = (e) => {
        
        setPassword(e.target.value);
    }
  
    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).
        then( async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            
            dispatch({
                type: 'LOGGED_IN_USER',
                payload:  {
                    email: user.email,
                    token: idTokenResult.token
                }
            });

            history.push('/');
        }).catch((error) => {
            console.log(error);
            toast.error(error.message);
        }) ;
    };
    
    const loginForm = () => (
        <form  onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                
                
                <TextField type='email' value={email} onChange={handleChangeEmail} autoFocus id="standard-basic" label="Email Address" fullWidth/>
                <TextField type='password' value={password} onChange={handleChangePassword}  id="standard-basic" label="Password" fullWidth/>
                
            </div>
            <div>
                <Button type="submit" 
                    onClick={handleSubmit}
                    disabled={!email || password.length < 6}
                    style={{margin: '8px 0px 0px 0px'}}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    startIcon={<MailRoundedIcon />}>
                    Login with Email & Password
                </Button>
                </div>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className='row' >
                <div  className='col-md-6 offset-md-3'>
                   { loading ? 
                                ( <div className="example">
                                     <Spin tip="Loading..."/>
                                  </div> ) :
                  
                              ( <h4>Login</h4> ) } 
                    
                    {loginForm()}
                    <Button type="submit" 
                    onClick={googleLogin}
                    
                    style={{margin: '8px 0px 0px 0px'}}
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    startIcon={<GoogleOutlined />}>
                    Login with Google
                    </Button>
                    <Link to="/forgot/password" className='float-right text-danger' style={{margin: '40px 0px 0px 0px' }} >Forgot Password ?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;