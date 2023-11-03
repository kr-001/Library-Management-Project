import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import StudentDashboard from './components/ui/StudentDashboard';
import Homepage from './components/ui/Homepage';
import RegisterForm from './components/Auth/Register';
import Redirect from './components/redirect/Redirect';
import Checkout from './components/ui/Checkout';
import MyBorrowings from './components/ui/MyBorrowings';
import AdminDasboard from './components/ui/AdminDashboard';
import BookForm from './components/ui/BookForm';
import UpdateBook from './components/ui/UpdateBook';
import BookView from './components/ui/BookView';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminDashboard' element={<AdminDasboard/>}/>
        <Route path='/redirect' element = {<Redirect/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path = '/studentDashboard' element = {<StudentDashboard/>}/>
        <Route path='/checkout/:bookId' element = {<Checkout/>}/>
        <Route path='/myBorrowings/:userId' element = {<MyBorrowings/>}/>
        <Route path='/addBook' element={<BookForm/>}/>
        <Route path='/updateBook/:bookId' element={<UpdateBook/>}/>
        <Route path='/viewBook/:bookId' element = {<BookView/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
