import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Loader from '../loader/Loader'

const RecentlyAdded = () => {
    const [Data, setData] = useState()
    useEffect(() => {
        axios.get("https://bookspace-72oz.onrender.com/api/v1/get-recent-books")
            .then(response => {
                setData(response.data.data)
            })
    }, [])
    return (
        <div className='mt-8 px-12 py-3'>
            <h2 className='text-3xl text-yellow-400'>Recently Added Books</h2>
            {!Data && 
             <div className='flex items-center justify-center my-8'><Loader/></div>
            }
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {Data &&
                    Data.map((items, i) => (
                        <div key={i}>
                            <BookCard data={items} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default RecentlyAdded
