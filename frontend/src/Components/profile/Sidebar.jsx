import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
const Sidebar = ({ data }) => {      //props
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className='bg-zinc-700 p-4 rounded flex flex-col items-center justify-between h-[85%]'>
      <div className='flex flex-col items-center'>
        <img src={data.avatar} className='h-[12vh]' alt="" />
        <p className='text-xl text-zinc-100 font-semibold mt-2'>{data.username}</p>
        <p className='text-zinc-300 text-sm'>{data.email}</p>
        <div className='w-full mt-3 bg-zinc-500  h-[1px] lg:block'></div>
      </div>
      {
        role === "user" && (
          // <div className='w-full lg:flex flex-col items-center hidden justify-center'>
          //   <Link to="/profile" className='w-full mt-8 font-semibold py-2 hover:bg-zinc-900 bg-zinc-800 text-zinc-100 text-center rounded transition-all duration-150'>Favorites</Link>
          //   <Link to='/profile/orderhistory' className='mt-4 w-full font-semibold py-2 bg-zinc-800 hover:bg-zinc-900 text-zinc-100 text-center rounded transition-all duration-150'>Order History</Link>
          //   <Link to='/profile/settings' className='w-full font-semibold py-2 bg-zinc-800 hover:bg-zinc-900 text-zinc-100 text-center rounded transition-all mt-4 duration-150'>Settings</Link>
          // </div> // own
          <div className='w-full lg:flex flex-col items-center hidden justify-center gap-4 p-4 bg-zinc-900 rounded-xl shadow-lg'>
            <Link
              to="/profile"
              className='w-full py-3 font-semibold text-zinc-100 text-center bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out'
            >
              ❤️ Favorites
            </Link>
            <Link
              to="/profile/orderhistory"
              className='w-full py-3 font-semibold text-zinc-100 text-center bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out'
            >
              📦 Order History
            </Link>
            <Link
              to="/profile/settings"
              className='w-full py-3 font-semibold text-zinc-100 text-center bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out'
            >
              ⚙️ Settings
            </Link>
          </div>

        )
      }
      {
        role === "admin" && (
          <div className='w-full lg:flex flex-col items-center hidden justify-center gap-4 px-4 py-6 bg-zinc-900 rounded-xl shadow-lg'>
            <Link
              to="/profile"
              className='w-full py-3 px-4 font-semibold text-zinc-100 text-center bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2'
            >
              📚 All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className='w-full py-3 px-4 font-semibold text-zinc-100 text-center bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2'
            >
              ➕ Add Book
            </Link>
          </div>
        )
      }
      <button
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
        className="bg-red-600 hover:bg-red-700 hover:cursor-pointer active:bg-red-800 text-white font-semibold flex items-center justify-center w-full p-3 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        Log Out
        <FaArrowRightFromBracket className="ms-3 text-lg transform transition-transform duration-300 group-hover:-translate-x-1 group-active:scale-90" />
      </button>
    </div>
  )
}

export default Sidebar
