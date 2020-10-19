import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import {auth} from '../../firebase';

import { toast} from 'react-toastify';
import {useSelector} from 'react-redux';

import { Spin } from 'antd';

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

const ForgotPassword = ({history}) => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
    }

     await auth.sendPasswordResetEmail(email, config)
     .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset email')
     }). catch((error) => {
         setLoading(false);
         toast.error(error.message);
     });
    }

    return (
        <div className='container col-md-6 offset-md-3 p-5' >
        {
            loading ?   ( <div className="example">
                            <Spin tip="Loading..."/>
                          </div> ) :

                        ( <h4>Forgot Password</h4> )
        }
        <form  onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                
                
                <TextField type='email' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus id="standard-basic" label="Email Address" fullWidth/>
                
            </div>
            <div>
                <Button type="submit" 
                    disabled={!email}
                    style={{margin: '8px 0px 0px 0px'}}
                    variant="contained" 
                    color="primary" 

                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    Submit
                </Button>
                </div>
        </form>
        </div>
    )
}
export default ForgotPassword;