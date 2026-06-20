import React, { useEffect, useState } from "react";
import api from "../../services/api.js";

const Orders = () => {
  const [data, setData] = useState([]);

 const fetchOrders = async () => {
    try {
        const response = await api.get("/orders/_all");
        setData(response.data);
    } catch (error) {
        console.error(error);
    }
};

const updateStatus = async (event, orderId) => {
    try {
        const response = await api.patch(
            `/orders/status/_${orderId}?status=${event.target.value}`
        );
        if (response.status === 200) {
            fetchOrders();
        }
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";

      case "Preparing":
        return "bg-warning text-dark";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-primary";
    }
  };

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <table className="table table-bordered table-hover table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Quantity</th>
              <th>Order Status</th>
              <th>Refresh</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Orders Found
                </td>
              </tr>
            ) : (
              data.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={order.orderItems[0]?.imageUrl}
                      alt="Food"
                      width={60}
                      height={60}
                      className="rounded"
                    />
                  </td>

                  <td className="text-start">
                   <div>
                     {order.orderItems.map((item, i) => (
                      <div key={i}>
                        <strong>{item.name}</strong> × {item.quantity}
                      </div>
                    ))}
                   </div>
                   <div>
                    {order.userAddress}
                   </div>
                  </td>
                  <td className="fw-bold text-success">
                    ₹{Number(order.amount).toFixed(2)}
                  </td>

                  <td>
                    {order.orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge ${getStatusClass(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      className="form-control"
                      onChange={(event) => updateStatus(event, order.id)}
                      value={order.orderStatus}
                    >
                      <option value="Food Preparing">Food Preparing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Deliverd">Deliverd</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
