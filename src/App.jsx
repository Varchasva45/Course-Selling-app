import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AppBar from "./components/AppBar";
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import Course from './components/Course';
import PayementSuccessPage from './components/PaymentSuccessPage';
import PayementFailurePage from './components/PaymentFailurePage';


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
          <Route path = "/payment-success" element = {<PayementSuccessPage/>} />
          <Route path = "/payment-failure" element = {<PayementFailurePage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
