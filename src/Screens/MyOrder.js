import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData) => {
                      return (
                        <div>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5 text-danger">
                              {(data = arrayData.Order_date)}
                              <hr />
                            </div>
                          ) : (
                            <div className="ms-1 col-12 col-md-6 col-lg-3">
                              <div
                                className="card mt-3 "
                                style={{
                                  width: "400%",
                                  maxHeight: "360px",
                                }}
                              >
                                {/* <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    /> */}
                                <div className="card-body">
                                  <h5 className="card-title text-primary d-inline">
                                    {arrayData.name}
                                  </h5>
                                  <div
                                    className="container w-100 p-0 d-inline"
                                    style={{ height: "38px" ,position:'absolute',left:'35%'}}
                                  >
                                    <span className="m-1">
                                      Quanity : {arrayData.qty}
                                    </span>
                                    <span className="m-1 text-capitalize">
                                      Size : {(arrayData.size)}
                                    </span>
                                    {/* <span className="">{data}</span> */}
                                    <div className="d-inline ms-2 h-100 w-20 fs-6">Paid : 
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })
                : "";
            })
            : ""}
        </div>
      </div>

      <Footer />
    </div>
  );
}
