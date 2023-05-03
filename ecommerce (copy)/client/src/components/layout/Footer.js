import React from 'react'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
      <div className='footer'>
        <h1 className='text-center'>All Rights Reserved &copy; Vishnu</h1>
        <p className='text-center mt-3'>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
        </p>
      </div>
    </>
  )
}
