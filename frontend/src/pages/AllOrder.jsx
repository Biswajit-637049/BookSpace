import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Components/loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrder = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  function change(e) {
    const { value } = e.target;
    setValues({ status: value });
   // console.log(Values);
  };
  const submitChange = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Values, { headers });
    alert(response.data.message);
  }
  useEffect(() => {
    axios.get(`http://localhost:1000/api/v1/get-all-orders`, { headers })
      .then((response) => {
        setAllOrders(response.data.data);
      })
  }, [AllOrders]);
  return (
    <>
      {
        !AllOrders && (
          <div className='flex items-center justify-center my-8'><Loader /></div>
        )
      }
      {
        AllOrders && AllOrders.length > 0 && (
          <div className="p-0 md:p-1 text-zinc-100 h-[100%]">
            <h1 className='text-3xl md:text-5xl font-semibold bg-zinc-900 p-2 text-center sticky top-0 z-10 text-red-500 mb-8'>All Orders</h1>
            <div className='mt-2 bg-zinc-600 rounded py-1 px-4 w-full flex gap-4'>
              <div className='w-[3%]'>
                <h1>Sr.</h1>
              </div>
              <div className='w-[22%]'>
                <h1>Books</h1>
              </div>
              <div className='w-[45%]'>
                <h1>Description</h1>
              </div>
              <div className='w-[9%]'>
                <h1>Price</h1>
              </div>
              <div className='w-[16%]'>
                <h1>Status</h1>
              </div>
              <div className='md:w-[5%] hidden md:block w-none'>
                <h1><FaUserLarge /></h1>
              </div>
            </div>
            <div className="h-[65vh] overflow-auto">
              {
                AllOrders &&
                AllOrders.map((items, i) => (
                  <div className='bg-zinc-800 w-full py-2 px-4 rounded flex gap-4 hover:bg-zinc-900 hover:cursor-pointer' key={i}>
                    <div className="w-[3%]">
                      {/* Serial number */}
                      <h1 className="text-center">{i + 1}</h1>
                    </div>
                    <div className="w-[22%]">
                      {/* Book title (with fallback if book is null) */}
                      <Link
                        to={items.book ? `/view-book-details/${items.book._id}` : "#"}
                        className='hover:text-blue-300'
                      >
                        {items.book ? items.book.title : "No book info"}
                      </Link>
                    </div>
                    {/* Description */}
                    <div className="w-[40%]">
                      <h1 className="text-center line-clamp-2">
                        {items.book ? items.book.desc.slice(0, 50) + "..." : "No description available"}
                      </h1>
                    </div>
                    {/* Price */}
                    <div className="w-[12%]">
                      <h1 className="text-center">
                        {items.book ? `₹${items.book.price}` : "N/A"}
                      </h1>
                    </div>
                    {/* Status */}
                    <div className="w-[19%]">
                      <h1 className='font-semibold'>
                        <button onClick={() => { setOptions(i) }} className="hover:scale-105 transition-all duration-300">
                          {items.status === "Order placed" ? (
                            <div className='text-yellow-500'>{items.status}</div>
                          ) : items.status === "Canceled" ? (
                            <div className='text-red-500'>{items.status}</div>
                          ) : (
                            <div className="text-green-600">{items.status}</div>
                          )}
                        </button>
                        <div className={`${Options === i ? "block" : "hidden"} flex mt-4`}>
                          <select name="status" className="bg-gray-800" value={Values.status} onChange={change}>
                            {[
                              "Order Placed", "Out for delivery", "Delivered", "Canceled"
                            ].map((items, i) => (<option key={i} value={items}>{items}</option>))}
                          </select>
                          <button onClick={() => { setOptions(-1); submitChange(i); }} className="mx-2"><FaCheck /></button>
                        </div>
                      </h1>
                    </div>
                    <div className="w-[2%]">
                      <button className="hover:text-orange-500 text-xl" onClick={() => { setUserDiv("fixed"); setUserDivData(items.user) }}><IoOpenOutline /></button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
      {userDivData && (
        <SeeUserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv} />
      )}
    </>
  );
};

export default AllOrder
