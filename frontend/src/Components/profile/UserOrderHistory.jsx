import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';
const UserOrderHistory = () => {
  const [Orderhistory, setOrderHistory] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    axios.get(`https://bookspace-72oz.onrender.com/api/v1/get-order-history`, { headers })
      .then((response) => {
        setOrderHistory(response.data.data);
      })
  }, [])
  return (
    <div>
      {
        !Orderhistory && <div className="flex justify-center h-[100%] items-center"><Loader /></div>
      }
      {Orderhistory && Orderhistory.length === 0 && (
        <div className="flex items-center h-80vh flex-col justify-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">No order history</h1>
            <img src="/orderhistory.avif" className="h-[40vh] mt-5" alt="empty cart" />
          </div>
        </div>
      )}
      <div className='h-[85vh] overflow-auto'>
        {
          Orderhistory && Orderhistory.length > 0 && (
            <div className='p-0 md:p-4 text-zinc-100 h-[100%]'>
              <h1 className='text-3xl md:text-5xl font-semibold bg-zinc-900 p-2 text-center sticky top-0 z-10 text-red-500 mb-8'>Your order history</h1>
              <div className='mt-4 bg-zinc-800 rounded py-2 px-4 w-full flex gap-4'>
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
                  <h1>mode</h1>
                </div>
              </div>
              {
                Orderhistory.map((items, i) => (
                  <div className='bg-zinc-800 w-full py-2 px-4 rounded flex gap-4 hover:bg-zinc-900 hover:cursor-pointer' key={i}>
                    <div className='w-[3%]'>
                      <h1>{i + 1}</h1>
                    </div>
                    <div className='w-[22%]'>
                      <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                        {items.book.title}
                      </Link>
                    </div>
                    <div className='w-[45%]'>
                      <h1>
                        {items.book.desc.slice(0, 50)}
                      </h1>
                    </div>
                    <div className='w-[9%]'>
                      <h1>&#x20B9; {items.book.price}</h1>
                    </div>
                    <div className='w-[16%]'>
                      <h1 className='font-semibold text-green-500'>
                        {items.status === "Order placed" ? (
                          <div className='text-yellow-500'>{items.status}</div>
                        ) : items.status === "Canceled" ? (
                          <div className='text-red-500'>{items.status}</div>
                        ) : (
                          items.status
                        )}
                      </h1>
                    </div>
                    <div className='md:w-[5%] hidden md:block w-none'>
                      <h1 className='text-zinc-400 text-sm'>COD</h1>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserOrderHistory
