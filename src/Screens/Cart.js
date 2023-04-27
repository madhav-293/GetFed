import React from 'react'
import {useCart ,useDispatchCart} from '../Components/ContextReducer'

export default function Cart() {
  let data =useCart()
  let dispatch = useDispatchCart();
  if(data.length===0){
    return (
      <div>
      <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckOut=async()=>{
    let userEmail=localStorage.getItem('userEmail')
    let response=await fetch('http://localhost:5000/api/orderData',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      order_data:data,
      email:userEmail,
      order_date:new Date().toDateString()
    })
    }
    );
    console.log("Order",response)
    if(response.status===200){
      dispatch({type:'DROP'})
    }
  }
  let totalPrice=data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
      <div className='container m-auto table-responsive table-responsive-sm table-responsive-md overlowAuto my-3'>
      <table className='table table-hover'>
        <thead className='text-primary fs-4'>
            <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
            </tr>
        </thead>
        <tbody>
          {data.map((food,index)=>(
            <tr>
            <th scope='row'>{index+1}</th>
            <td className='text-danger'>{food.name}</td>
            <td>{food.qty}</td>
            <td className='text-capitalize'>{food.size}</td>
            <td>{food.price}</td>
            <td ><button type="button" className="btn p-0">
            <button type="button" class="btn btn-danger btn-sm" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Remove</button>
            </button> </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className='fs-6 text-primary'>To Pay: ₹{totalPrice}</h1>
      </div>
<div className='m-3'>
  <button className='btn btn-danger float-end' onClick={handleCheckOut}>Check Out</button>
</div>
      </div>
    </div>
  )
}
