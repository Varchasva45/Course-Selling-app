import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import AddCourse from "./AddCourse";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { display } from "@mui/system";
import { useTheme } from "@emotion/react";
import axios from "axios";

function Course() {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {

        function callback2(data) {
            console.log(data.course)
            setCourse(data.course);
        }

        function callback1(res) {
            res.json().then(callback2);
        }

        fetch("http://localhost:3000/admin/courses/" + courseId, {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);


    if (!course) {
        return <div>Loading...</div>; 
    }

    if(course) {
        console.log(course.price)
        return <div>
                <GrayTopper course = {course}></GrayTopper>
                <Grid container>
                    <Grid item lg={8} md={6} sm={6} marginTop={-5} zIndex={0}>
                        <UpdateCard course = {course} setCourse = {setCourse}></UpdateCard>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} marginTop={-24}>
                        <CoCard course={course} />
                    </Grid>
                </Grid>
        </ div>
    }
}

function GrayTopper(props) {
    return <>
        <div style={{
            backgroundColor: "#333333",
            width: "100%",
            height: "300px",
            zIndex: 0, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h3" color="white">
                {props.course.title}
            </Typography>
            
        </div>
    </>
}

function UpdateCard(props) {

    const [title, setTitle] = useState(props.course.title);
    const [price, setPrice] = useState(props.course.price);
    const [image, setImage] = useState(props.course.imageLink);
    const [description, setDescription] = useState(props.course.description);

    return <>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card varint={"outlined"} style={{width : 600, padding : 20}}>
                <TextField label = "title" value={title} fullWidth = {true} onChange={(e) => {
                    setTitle(e.target.value);
                }}></TextField>
                <br /> <br />
                <TextField label = "price" value={price} fullWidth = {true} onChange={(e) => {
                    setPrice(e.target.value);
                }}></TextField>
                <br /> <br />
                <TextField label = "descritption" value={description} fullWidth = {true} onChange={(e) => {
                    setDescription(e.target.value);
                }}></TextField>
                <br /> <br />
                <TextField label = "thumbnail" value={image} fullWidth = {true} onChange={(e) => {
                    setImage(e.target.value);
                }}></TextField>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 15
                }}>
                    <Button variant="contained" size="large" onClick={async () => {
                        axios.put("http://localhost:3000/admin/courses/" + props.course._id, {
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedCourse = {
                            _id: props.course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        };
                        props.setCourse(updatedCourse);
                    }}>Update Course</Button>
                </div>
            </Card>
        </div>
    </>
}


function CoCard(props) {

    if(props.course.price) {
        const initalDesc = props.course.description.substr(0, 200) + ".... ";
        const [description, changeDesc] = useState(initalDesc);
        const [descButton, changeButton] = useState("read more");

        return <>
            <div className="card">
                <img src={props.course.imageLink} className="image" alt="" />
                <div className="course-info">
                    <div className="course-details">
                        <h1 className="course-price">₹{props.course.price}</h1>
                        <h4>{props.course.title}</h4>
                    </div>

                    <div className="description">
                        {description}
                        <span className="read-more" onClick={() => {
                            if(descButton === "read more") {
                                changeDesc(props.course.description + "....  ")
                                changeButton("show less")
                            }else if(descButton === "show less") {
                                changeDesc(initalDesc)
                                changeButton("read more")
                            }
                        }}>{descButton}</span>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Course;
