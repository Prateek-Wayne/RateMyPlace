import { Button,  Dialog, DialogContent, DialogTitle,  TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Login = ({ login, setLogin,localStorage,setCurrentUsername }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const user={
            username,
            password
        };
        const loginUser=async (user) =>{
            try {
                const userData=await axios.post("user/login",user);
                localStorage.setItem("user",userData.data.user.username);
                setCurrentUsername(userData.data.user.username);
            } catch (error) {
                console.log(error);
            }
        };
        loginUser(user);
        setUsername('');
        setPassword('');
        setLogin(false);
    }
    return (
        <div>
            <Dialog open={login} onClose={() => setLogin(false)}>
                <DialogTitle style={{ backgroundColor: '#f5f5f5', color: '#333' }}>Login</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            fullWidth
                            variant="outlined"
                        />
                        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '10px' }}>Login</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Login
