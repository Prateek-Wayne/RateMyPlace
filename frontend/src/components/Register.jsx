import { Button, Dialog, DialogContent, DialogTitle, TextField} from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Register = ({ register, setRegister }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser={
            email,
            username,
            password
        };
        const registerUser= async (newUser) =>{
            try {
                const registerData=await axios.post("user/register",newUser);
                console.log(registerData);
            } catch (error) {
                console.log(error);
            }
        };
        registerUser(newUser);
        setEmail('');
        setUsername('');
        setPassword('');
        setRegister(false);
    }
    return (
        <div>
            <Dialog open={register} onClose={() => setRegister(false)}>
                <DialogTitle style={{ backgroundColor: '#f5f5f5', color: '#333' }}>Register</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Email"
                            type="text"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            fullWidth
                            variant="outlined"
                        />
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
                        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '10px' }}>Register</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Register
