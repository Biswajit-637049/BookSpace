import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    axios.get(`http://localhost:1000/api/v1/get-user-information`, { headers })
      .then((response) => {
        setProfileData(response.data);
        setValue({ address: response.data.address });
      })
  }, [])
  function submitAddress() {
    axios.put(`http://localhost:1000/api/v1/update-address`, { address: Value.address }, { headers })
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert('Failed to update address.', error);
      });
  }
  return (
    <div>
      {
        !ProfileData && (<div className="flex justify-center h-[90vh] items-center"><Loader /></div>)
      }
      {
        ProfileData && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-100 mb-8'>Settings</h1>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 p-4 bg-white rounded-xl shadow-md">
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Username</label>
                <p className="bg-zinc-800 text-white font-semibold rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-inner">
                  {ProfileData.username}
                </p>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Email</label>
                <p className="bg-zinc-800 text-white font-semibold rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-inner">
                  {ProfileData.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-6 bg-white p-6 rounded-2xl shadow-md transition-all duration-300">
              <label htmlFor="address" className="text-sm font-medium text-zinc-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Enter your full address here..."
                value={Value.address}
                onChange={(e) => setValue({ ...Value, address: e.target.value })}
                rows="5"
                className="bg-zinc-800 text-white placeholder-zinc-400 font-medium rounded-lg p-4 resize-none shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:shadow-lg"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gradient-to-r hover:cursor-pointer from-yellow-500 to-yellow-400 text-zinc-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                onClick={submitAddress}
              >
                <span className="text-lg">Update</span>
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Settings