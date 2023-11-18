import { ClassNames } from '@emotion/react';
import {Typography} from '@mui/material'
import  {Button} from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


function AppBar() {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const email = userEmail;

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: 'GET',
            headers: {
                authorization: "bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            setUserEmail(data);
            console.log(data);
        })
    }, []);

    if(userEmail  != "") {
        
    return <div style={{
            display : "flex",
            justifyContent : "space-between",
            padding : 4
        }}>
            <div>
                <Typography variant = "h6">
                    Coursera
                </Typography>
            </div>
            <div>
                <Typography variant = "h6" paddingLeft={28}>
                    Welcome, {userEmail.username}!
                </Typography>
            </div>
            <div style={{
                display : "flex",
            }}>
                <div>
                    <Button variant="text" 
                        onClick={() => {
                            navigate("/admin/addcourses")
                        }}
                    >Add Courses</Button>
                </div>

                <div>
                    <Button variant="text" 
                        onClick={() => {
                            navigate("/courses");
                        }}
                    >Courses</Button>
                </div>

                <div style={{
                    marginLeft : "10px"
                }}>
                    <Button 
                        variant='contained'
                        onClick = {() => {
                            localStorage.setItem("token", null);
                            navigate("/");
                            window.location.reload();
                        }}
                    >Log Out</Button>
                </div>
                
            </div> 
        </div>
    }


    return <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: 4}}>
            <div>
                <Typography variant = {"h6"}>
                    Coursera
                </Typography>
            </div>
            <div style={{
                display : "flex",
            }}>
                <div style={{marginRight : 10}}>
                    <Button 
                        variant='contained'
                        onClick = {() => {
                            navigate("/signup");
                        }}
                    >Sign Up</Button>
                </div>
                <div>
                    <Button 
                        variant='contained'
                        onClick = {() => {
                            navigate("/signin");
                        }}
                    >Sign In</Button>
                </div>
                
            </div> 
        </div>
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '4%',
                marginRight: '4%',
                marginTop: '10%',
                height: '50vh'
            }
        }>
            <img src={"https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1060&t=st=1700316431~exp=1700317031~hmac=cd26acfe469c88f83835d5e9bc86ade6e882cbac6eed56475897dcc1ce8d3017"} alt="Landing" style={{ width: '100%', height: "600px" }} />
        </div>
    </div>
}


export default AppBar;