import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Cart from '../Screens/Cart';
import Modal from '../Model';
import { useCart } from './ContextReducer';
export default function Navbar() {
  const [cartView,setCartView]=useState(false)
  let data =useCart()
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic text-danger" to="/">GetFed</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem('authToken'))?
        <li className="nav-item">
          <Link className='nav-link fs-5 active' aria-current="page" to="/myOrder">My Orders</Link>

        </li>
      :""}
      </ul>
      {!(localStorage.getItem('authToken'))?
      <div className='d-flex'>
          <Link className="btn text-success mx-1 bg-dark" to="/login">Login</Link>
          <Link className="btn text-danger bg-white mx-1" to="/createuser">SignUp</Link>
      </div>
      :
      <div>
      <div className='btn text-primary mx-2' onClick={()=>{setCartView(true)}}>
        My Cart{" "}
        <Badge pill bg='danger'>{data.length}</Badge>
      </div>
      {cartView?<Modal onClose={()=>{setCartView(false)}}>
        <Cart/>
      </Modal>:null}
      <div className='btn mx-2 btn-danger' onClick={handleLogout}>
        Logout
      </div>
      </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
