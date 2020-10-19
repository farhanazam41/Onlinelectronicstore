import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {auth} from '../../firebase';
import { toast} from 'react-toastify';

import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

const Register = ({history}) => { 

    const classes = useStyles();

    const [email, setEmail] = useState('');

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
      if(user && user.token) {
        history.push('/');
      }
    },[user])

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Confirmation email is sent to ${email}. Click the link to complete your registration`);

        window.localStorage.setItem('emailForRegistration', email); // save user email to localstorage

        setEmail('');
    }//
    const registerForm = () => (
        <form  onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                
                
                <TextField type='email' value={email} onChange={handleChange} autoFocus id="standard-basic" label="Email Address" fullWidth/>
                
            </div>
            <div>
                <Button type="submit" 
                    style={{margin: '8px 0px 0px 0px'}}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    Submit
                </Button>
                </div>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className='row' >
                <div  className='col-md-6 offset-md-3'>
                    <h4>Register</h4>
                    
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register;