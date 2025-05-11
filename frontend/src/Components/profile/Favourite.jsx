import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favourite = () => {
    const [FavouriteBooks, setFavouriteBooks] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
        axios.get(`http://localhost:1000/api/v1/get-favourite-books`, { headers })
            .then((response) => {
                setFavouriteBooks(response.data.data)
            })
            .catch((err) => {
                console.log(`favourite data is not come :`, err);
            })
    }, [FavouriteBooks])
    return (
        <>
            {
                FavouriteBooks.length === 0 && (
                    <div className='text-sm md:text-5xl h-[100%] text-zinc-500 w-full font-semibold flex flex-col items-center justify-center'>
                        No favourite books available
                        <img src="/favorite.jpg" alt="" className='h[25vh] w-[30vh] my-8' />
                    </div>
                )
            }
            <div className="h-[85vh] overflow-y-auto">
                <div className='grid grid-cols-3 gap-3'>
                    {
                        FavouriteBooks && FavouriteBooks.map((items, i) => (
                            <div key={i}>
                                <BookCard data={items} favourite={true} /> {/* favourite true then remove button show only this favourite page*/}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Favourite
