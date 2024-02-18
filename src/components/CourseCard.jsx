import { useState } from "react";
import "./CourseCard.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ConstructionOutlined } from "@mui/icons-material";

function CourseCard(props) {
    const navigate = useNavigate();

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OkvUsSIy7xLF6FWwz748UvcGqqj4LFcbxzLPllHj5BS6zyuVwnSeTJ7bGHM9VVRLE5XPGTq6dGCY8rAMxV0noWD00C2ktRzz9");
        const body = {
            course: props.course
        };
        const headers = {
            "Content-Type": "application/json"
        };
    
        try {
            const response = await fetch("http://localhost:3000/payment/create-checkout-session", {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            });
    
            const session = await response.json();
    
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            console.log("Here");
    
            if (result.error) {
                console.error("Error redirecting to checkout:", result.error.message);
            } else {
                localStorage.setItem("checkoutResult", JSON.stringify(result));
                console.log("Checkout result:", result);
            }
        } catch (error) {
            console.error("Error during payment process:", error);
        }
    };
    
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

                <div 
                    style={{
                        display : "flex",
                        justifyContent : "space-around",
                        gap: 5
                    }}
                > 
                    <button  className="btn-red" onClick={() => {
                        navigate("/courses/" + props.course._id)
                    }} > EDIT</button>

                    <button  className="btn-red" onClick={() => {
                        makePayment();
                    }} > Buy Now</button>
                </div>
                
            </div>
        </>
    }

    return <>
        No Courses
    </>
}

export default CourseCard;