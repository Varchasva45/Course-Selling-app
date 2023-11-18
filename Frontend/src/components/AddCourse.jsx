import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import Logout from './Logout';

function AddCourse() {
    const [labelTitle, setlabelTitle] = useState("");
    const [labelDescription, setlabelDescription] = useState("");
    const [labelPrice, setlabelPrice] = useState("");
    const [labelImageLink, setlabelImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImage] = useState("");

    return <div>
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
                <TextField id={"title"} label = "Course Title" value = {labelTitle} variant="outlined" fullWidth = {true} onChange={(e) => {
                    setlabelTitle(e.target.value); 
                    setTitle(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"description"} label ="Course Description" value = {labelDescription} variant="outlined" fullWidth = {true} onChange={(e) => {
                    setlabelDescription(e.target.value);
                    setDescription(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"price"} variant="outlined" label = "Course Price" value = {labelPrice}  fullWidth = {true} onChange={(e) => {
                    setlabelPrice(e.target.value);
                    setPrice(e.target.value);
                }}/>
                <br></br>
                <br />
                <TextField id={"thumbnail"} variant="outlined" label = "Course Thumbnail" value = {labelImageLink} fullWidth = {true} onChange={(e) => {
                    setlabelImage(e.target.value);
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
                                alert("Course Added");
                                setlabelTitle("");
                                setlabelDescription("");
                                setlabelImage("");
                                setlabelPrice("");
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