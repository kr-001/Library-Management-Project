import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import StudentDashboard from './components/ui/StudentDashboard';
import Homepage from './components/ui/Homepage';
import RegisterForm from './components/Auth/Register';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path = '/studentDashboard' element = {<StudentDashboard/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
