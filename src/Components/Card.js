import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
export default function Card(props) {
  let navigate = useNavigate()
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item
        break
      }
    }
    if(food!==[]){
      if(food.size===size){
        await dispatch({type:'UPDATE',id:props.foodItem._id,qty:qty,price:finalPrice,size:size})
        return 
      }
    
    else if(food.size!==size){
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price:finalPrice,
      qty: qty,
      size: size,
    });
    return 
  }
  return
}
await dispatch({
  type: "ADD",
  id: props.foodItem._id,
  name: props.foodItem.name,
  price:finalPrice,
  qty: qty,
  size: size,
});
    // console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  const check=()=>{
    if(!(localStorage.getItem('authToken'))) navigate('/login')
  }
  const twoF=()=>{
    check();
    handleAddToCart();
  }
  return (
    <div>
      <div>
        <div
          className="card mt-3 border border"
          style={{ width: "16rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            alt="..."
            className="card-img-top"
            style={{ height: "150px ", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
           
            <div className="container w-100">
              <select
                className="m-2 h-100  bg-secondary rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className=" bg-secondary rounded h-100 text-capitalize" ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="m-1 d-inline h-100 fs-6"> ₹{finalPrice}</div>
              <hr />
              <button
                className={" btn btn-secondary"} style={{marginLeft:'37px'}}
                onClick={twoF}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
