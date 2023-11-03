import React , {useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function UpdateBook() {
    const [book , setBook]  = useState(null);
    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/api/')
    },[])
    const {bookId} = useParams();
    console.log(bookId);
  return (
    <>
        <h3>Update Book Dashboard</h3>
    </>
  )
}
