import PropTypes from "prop-types"; // ✅ Import PropTypes
import { useState } from "react";

const CustomerAddress = ({ order, handleDelete }) => {
  const [status, setStatus] = useState("");
//   const [courierId, setCourierId] = useState(order?.courier_id || "");

  const handleUpdate = (id) => {
    fetch(`https://servers.virtualshopbd.com/updateStatus/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    alert("Status updated");
  };

//   const handleUpdates = (id) => {
//     fetch(`https://servers.virtualshopbd.com/updateCourier/${id}`, {
//       method: "PUT",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ courier_id: courierId }),
//     })
//       .then((res) => res.json())
//       .then((result) => console.log(result));
//     alert("Courier ID updated");
//   };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="space-y-3">
        {[
          { label: "My Name", value: order?.cus_name },
          { label: "Address", value: order?.address },
          { label: "Post Code", value: order?.cus_postcode },
        //   { label: "Payment Number", value: order?.payment_number },
          { label: "Phone Number", value: order?.cus_email },
          { label: "Status", value: order?.status },
          { label: "Total Amount", value: `BDT ${order?.total_amount} Taka` },
          { label: "Transaction ID", value: order?.tran_id },
        //   { label: "Wallet Amount", value: order?.wallet_amount },
          { label: "Date", value: order?.date },
        ].map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <span className="font-medium">{item.label}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">{status}</label>
        <select
          onChange={(e) => setStatus(e.target.value.toLowerCase())}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => handleUpdate(order._id)}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Status
        </button>
      </div>

      <div className="mt-4">
        {/* <label className="block text-sm font-medium">Courier ID:</label>
        <input
          type="text"
          value={courierId}
          onChange={(e) => setCourierId(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        /> */}
        {/* <button
          onClick={() => handleUpdates(order._id)}
          className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Update Courier ID
        </button> */}
      </div>

      <button
        onClick={() => handleDelete(order._id)}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Delete Order
      </button>
    </div>
  );
};

// ✅ Add PropTypes validation
CustomerAddress.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cus_name: PropTypes.string,
    address: PropTypes.string,
    cus_postcode: PropTypes.string,
    payment_number: PropTypes.string,
    cus_email: PropTypes.string,
    status: PropTypes.string,
    total_amount: PropTypes.number,
    tran_id: PropTypes.string,
    wallet_amount: PropTypes.number,
    date: PropTypes.string,
    courier_id: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CustomerAddress;
