import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function Login() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleLogin = () =>{
        axios.post('http://127.0.0.1:8000/api/login' , {email , password})
        .then((response)=>{
            console.log(response.data.access_token);
            console.log(response.data.role);
            localStorage.setItem('token' , response.data.access_token);
            localStorage.setItem('role' , response.data.role)
            navigate('/redirect');

        })
        .catch((error)=>{
            console.log(error);
        })
    }


  return (
    <>
    <div>
      <h2>User Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
    </>
  )
}
