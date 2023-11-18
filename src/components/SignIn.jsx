import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import AppBar from './AppBar';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return <div>
        <div style={{
            paddingTop : 100,
            paddingBottom : 10,
            display : "flex",
            justifyContent : "center"
        }}>
            <div style={{
                display: 'flex',
                flexDirection : 'column'
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant = {"h6"}>
                Sign In 
                </Typography>
            </div>
        </div>
       
        <div style={{
            display : "flex",
            justifyContent : "center"
        }}> 
            <Card varint={"outlined"} style={{width : 400, padding : 20}}>
                <TextField id={"username"} label="Email" variant="outlined" fullWidth = {true} required={true} onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"password"}  label="Password" variant="outlined" type="password" required={true} fullWidth = {true} onChange={(e) => {
                    setPass(e.target.value);
                }}/>
                <br></br>
                <br />
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            fetch("http://localhost:3000/admin/login", {
                                method: "POST",
                                headers: {
                                    username : email,
                                    password : pass
                                }
                            }).then((response) => {
                                return response.json();
                            }).then((data) => {
                                if(data.status == 200) {
                                    localStorage.setItem("token", data.token);
                                    console.log(data);
                                    navigate("/");
                                    window.location.reload();
                                }else {
                                    console.log(data.status);
                                }
                            })
                        }}
                    >
                        Sign In
                    </Button>
                </div>
            </Card>
        </div>
        <div style={{
            display : "flex",
            justifyContent : "center",
            paddingTop: 20,
            paddingLeft: 10
        }}>
           
            <Link href="#" variant="body2">
                Forgot password?
            </Link>
                
            <Link href="/SignUp" variant="body2" paddingLeft={15}>
            {"Don't have an account? Sign Up"}
            </Link>
               
        </div>
        
    </div>
}

export default SignIn;

{/* <Button 
size='large' 
variant="contained" 
onClick={() => {
    fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        body: JSON.stringify({
            username : email,
            password : pass
        }),
        headers: {
            "Content-type" : "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if(data.status == 200) {
            localStorage.setItem("token", data.token);
            console.log(data);
            navigate("/admin/addcourses");
        }else {
            console.log(data.status);
        }
    }) 
}}
>
Sign Up
</Button> */}