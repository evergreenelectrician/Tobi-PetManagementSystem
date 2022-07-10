import React from 'react'
import '../styles/navbar.css';
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


function Header() {

  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='navbar'>
      <h2>ToBi - Pet Management System</h2>
      {user ? <button onClick={handleSignOut} >Logout</button> : <button><Link to="/signin">Sign In</Link></button>}
    </div>
  )
}

export default Header