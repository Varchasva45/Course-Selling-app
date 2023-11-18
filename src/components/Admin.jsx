import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import Logout from './Logout';

function AddCourse() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImage] = useState("");

    return <div>
        <Logout></Logout>
        <div style={{
            paddingTop : 100,
            paddingBottom : 10,
            display : "flex",
            justifyContent : "center"
        }}>
            <Typography variant = {"h6"}>
                Add New Courses!
            </Typography>
        </div>
       
        <div style={{
            display : "flex",
            justifyContent : "center"
        }}> 
            <Card varint={"outlined"} style={{width : 400, padding : 20}}>
                <TextField id={"title"} label="Course Title" variant="outlined" fullWidth = {true} onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"description"} label="Course Description" variant="outlined" fullWidth = {true} onChange={(e) => {
                    setDescription(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"price"} label="Course Price" variant="outlined" fullWidth = {true} onChange={(e) => {
                    setPrice(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"thumbnail"} label="Course Thumbnail" variant="outlined" fullWidth = {true} onChange={(e) => {
                    setImage(e.target.value);
                }}/>
                <br></br>
                <br />
                <div style={{
                    display : "flex",
                    justifyContent : "center"
                }}>
                    <Button 
                        size='large' 
                        variant="contained" 
                        onClick={() => {
                            fetch("http://localhost:3000/admin/addcourses", {
                                method: "POST",
                                body: JSON.stringify({
                                    title,
                                    description,
                                    price,
                                    imageLink,
                                    published : true
                                }),
                                headers: {
                                    "Authorization" : "Bearer " + localStorage.getItem("token"),
                                    "Content-type" : "application/json"
                                }
                            }).then((response) => {
                                return response.json();
                            }).then((data) => {
                                console.log(data);
                            }) 
                        }}
                    >
                        Add Course
                    </Button>
                </div>
            </Card>
        </div>
    </div>
}

export default AddCourse;;