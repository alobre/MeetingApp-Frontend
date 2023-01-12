import React, {useState, useEffect, useRef} from 'react'
// import Button from '@mui/material/Button';
import { TextField, Typography, Button } from '@mui/material';
import style from './style.css'

const LoginScreen = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        setErrMsg('')
    }, [user, password])
    return(
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <Typography variant="h3" component="h2">
                Login
            </Typography>
            <form className='formParent'>
                <TextField id="username" label="Username" variant="standard" autoComplete='off' onChange={(text)=>setUser(text)}/>
                <TextField id="password" label="Password" variant="standard" autoComplete='off' onChange={(text)=>setPassword(text)}/>
                <Button variant="contained">Login</Button>
            </form>
        </section>
    )
}
export default LoginScreen