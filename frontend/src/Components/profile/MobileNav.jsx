import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {
                role === "user" && (<div className='w-full flex justify-between items-center my-8 lg:hidden md:hidden'>
                    <Link to="/profile" className='w-full mt-8 font-semibold py-2 hover:bg-zinc-900 bg-zinc-800 text-zinc-100 text-center rounded transition-all duration-150'>Favorites</Link>
                    <Link to='/profile/orderhistory' className='mt-4 w-full font-semibold py-2 bg-zinc-800 hover:bg-zinc-900 text-zinc-100 text-center rounded transition-all duration-150'>Order History</Link>
                    <Link to='/profile/settings' className='w-full font-semibold py-2 bg-zinc-800 hover:bg-zinc-900 text-zinc-100 text-center rounded transition-all mt-4 duration-150'>Settings</Link>
                </div>)
            }
            {
                role === "admin" && (<div className='w-full flex justify-between items-center my-8 lg:hidden md:hidden'>
                    <Link to="/profile" className='w-full mt-8 font-semibold py-2 hover:bg-zinc-900 bg-zinc-800 text-zinc-100 text-center rounded transition-all duration-150'>All Order</Link>
                    <Link to='/profile/add-book' className='mt-4 w-full font-semibold py-2 bg-zinc-800 hover:bg-zinc-900 text-zinc-100 text-center rounded transition-all duration-150'>Add Book</Link>
                </div>)
            }
        </>
    )
}

export default MobileNav
