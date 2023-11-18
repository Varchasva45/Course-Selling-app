import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '270px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/admin/addcourses");
            }}
          >
            Add Courses
          </Button>
        </div>

        <div>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/courses");
            }}
          >
            Show Courses
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
