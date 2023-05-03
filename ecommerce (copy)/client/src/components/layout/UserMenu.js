import React from 'react'
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
   <div className="list-group">
      <NavLink to="/dashboard/user/" className="list-group-item list-group-item-action">DashBoard</NavLink>
      <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
      <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
    </div>
    </>
  )
}
