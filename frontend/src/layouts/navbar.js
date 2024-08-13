import React from 'react'
import { NavLink } from "react-router-dom"
import logo from '../logo.svg'
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function NavBar() {
  return (
    <div>
      <nav className='navbar navbar-expanded-lg navbar-light bg-light'>
        <NavLink className="navbar-brand" to="/">
        <img style={{width: 25 + "%"}} src={logo}/>
        </NavLink>
        <div className='navbar' id="navbarSupportedContent">
          <ul>
            <NavLink className="nav-link" to="/">List</NavLink>
            <NavLink className="nav-link" to="/create">Create Post</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </ul>
        </div>
      </nav>
    </div>
  )
}
