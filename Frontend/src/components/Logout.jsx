import {Typography} from '@mui/material'
import  {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate();
    
    return <div style={{
        display : "flex",
        justifyContent : "space-between",
        padding : 4
    }}>
        <div>
            <Typography variant = {"h6"}>
                Dashboard
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
                >Add Courses</Button>
            </div>

            <div style={{marginRight : 10}}>
                <Button 
                    variant='contained'
                    onClick = {() => {
                        navigate("/Courses");
                    }}
                >Show Courses</Button>
            </div>


        </div> 
    </div>
}


export default Logout;