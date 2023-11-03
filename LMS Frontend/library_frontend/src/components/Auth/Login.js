import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../ui/Navbar';

export default function Login() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleLogin = () => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      localStorage.setItem('csrf' , csrfToken)
      axios.post('http://127.0.0.1:8000/api/login', {email, password}, {
          headers: {
              'X-CSRF-TOKEN': csrfToken
          }
      })
      .then((response) => {
          console.log(response.data.access_token);
          console.log(response.data.role);
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('role', response.data.role)
          navigate('/redirect');
      })
      .catch((error) => {
          console.log(error);
      })
  }
  
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a href="#!" className="text-white-50">Forgot password?</a></p>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleLogin}>Login</button>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
