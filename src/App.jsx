import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AppBar from "./components/AppBar";
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import Dashboard from './components/Dashboard';
import Course from './components/Course';


function App() {
  return (
    
    <div style={{
      height : "100vh",
      width: "100vw",
      background : "#eeeeee"
    }}>

      <Router>
        <AppBar></AppBar>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={< Course/>} />
          <Route path = "/signup" element = {<SignUp />}/>
          <Route path = "/signin" element = {<SignIn />}/>
          <Route path = "/admin/addcourses" element = {<AddCourse/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
