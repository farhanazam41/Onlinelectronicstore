import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {auth} from '../../firebase';
import { toast} from 'react-toastify';

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

const RegisterComplete = ({history}) => { 

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log(window.location.href);
        console.log(window.localStorage.getItem('emailForRegistration'));
    },[])

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            toast.error('Email and Password is required');
            return;
        }

        if(password.length < 6 ) {
            toast.error('Password length can not be less than 6');
            return;
        }
        
        try {
          const result =  await auth.signInWithEmailLink(email, window.location.href);
          
          if(result.user.emailVerified){
              window.localStorage.removeItem('emailForRegistration');

              let user = auth.currentUser;

              await user.updatePassword(password);

              const idTokenResult = await user.getIdTokenResult();

              history.push("/");

          }
        }
        catch(error){
          console.log(error);
          toast.error(error.message);
        }
        
    }//
    const CompleteRegistrationFrom = () => (
        <form  onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                
                
                <TextField type='email' value={email}  disabled id="standard-basic" label="Email Address" fullWidth/>
                <TextField type='password' value={password} onChange={handleChange} autoFocus  id="standard-basic" label="Password" fullWidth/>
                
            </div>
            <div>
                <Button type="submit" 
                    style={{margin: '8px 0px 0px 0px'}}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    Register
                </Button>
                </div>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className='row' >
                <div  className='col-md-6 offset-md-3'>
                    <h4>Complete Registeration</h4>
                    
                    {CompleteRegistrationFrom()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;