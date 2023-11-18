import { useState } from "react";
import "./CourseCard.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {

    const navigate = useNavigate();

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
                <button  className="btn-red" onClick={() => {
                    navigate("/courses/" + props.course._id)
                }} > EDIT</button>
            </div>
        </>
    }

    return <>
        No Courses
    </>
}

export default CourseCard;