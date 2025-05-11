import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../Components/BookCard/BookCard'
import Loader from '../Components/loader/Loader'
export function AllBooks() {
    const [Data, setData] = useState()
    useEffect(() => {
        axios.get("http://localhost:1000/api/v1/get-all-books")
            .then(response => {
                setData(response.data.data)
            })
    }, [])
    return (
        <div className='bg-zinc-900 h-auto py-8 px-12'>
            <h2 className='text-3xl font-semibold text-center p-5 text-red-600'>All Books</h2>
            {!Data &&
                <div className='flex items-center justify-center my-8'><Loader /></div>
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