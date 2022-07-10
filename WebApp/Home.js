import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


function Home() {

  const { user } = UserAuth();
  
  return (
    <>
    <h1>Home</h1>
    {user ? <button><Link to="/dashboard">Go to Dashboard</Link></button> : null}
    </>
  )
}

export default Home