import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function AdminDashboard() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useEffect(null);
    
  return (
    <>
    <Navbar title = 'Admin Dashboard - Library Management System'/>
    </>
  )
}
