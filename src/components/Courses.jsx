import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";

function Courses() {
    
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        function callback2(data) {
            setCourses(data.courses);
        }

        function callback1(res) {
            res.json().then(callback2);
        }

        fetch("http://localhost:3000/admin/courses", {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div className="main-card">
        <div className="cards">
            {
                courses.map(course => {
                    return <CourseCard key ={course.id} course={course} />
                })
            }
        </div>
    </div>
}

export default Courses;
