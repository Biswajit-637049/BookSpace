import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../loader/Loader';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate=useNavigate("");
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    useEffect(() => {
        axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    }, [id]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };
    function handleFavourite() {
        axios.put(`http://localhost:1000/api/v1/add-book-to-favourite`, {}, { headers }) // (url, body, { config }) empty data body (because you’re not sending any body data)
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                console.error("Error adding to favourite:", error);
            });
    };
    function handleCart() {
        axios.put(`http://localhost:1000/api/v1/add-to-cart`, {}, { headers }) // (url, body, { config }) empty data body (because you’re not sending any body data)
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                console.error("Error adding to favourite:", error);
            });
    }
    function deleteBook(){
        axios.delete(`http://localhost:1000/api/v1/delete-book`,{headers})
         .then((response) => {
                alert(response.data.message);
                navigate("/all-books");
            })
            .catch((error) => {
                console.error("Error adding to favourite:", error);
            });
    }
    return (
        <>
            {
                data && (
                    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
                        <div className='bg-zinc-800 rounded p-4 h-[75vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col items-center justify-center'>
                            <img src={data.url} className='h-[50vh] lg:h-[70vh]' />
                            {
                                isLoggedIn === true && role === "user" && (
                                    <div className='mt-5 flex'>
                                        <button
                                            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95"
                                            onClick={handleFavourite}
                                        >
                                            <FaHeart className="text-2xl" />
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg px-5 py-3 ms-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 flex items-center"
                                            onClick={handleCart}
                                        >
                                            <FaShoppingCart className="text-2xl" />
                                            <span className="ms-1">Add to cart</span>
                                        </button>
                                    </div>
                                )
                            }
                            {
                                isLoggedIn === true && role === "admin" && (
                                    <div className='mt-5 flex'>
                                        <Link to={`/updateBook/${id}`} className="flex items-center bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl text-lg px-5 py-2 hover:scale-105 transform transition shadow">
                                            <FaEdit className="mr-2 text-xl" />
                                            <span>Edit</span>
                                        </Link>
                                        <button onClick={deleteBook} className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl text-lg px-5 py-2 ms-4 hover:scale-105 transform transition shadow">
                                            <MdDeleteOutline className="mr-2 text-xl" />
                                            <span>Delete Book</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className='p-4 w-full lg:w-3/6 flex justify-center items-center'>
                            <div>
                                <h1 className='text-4xl font-semibold text-zinc-300'>{data.title}</h1>
                                <p className='text-zinc-300 mt-1'>by {data.author}</p>
                                <p className='text-xl mt-4 text-zinc-400'>{data.desc}</p>
                                <p className='text-zinc-300 mt-4 flex items-center justify-start'>
                                    <GrLanguage className='me-3' /> {data.language}
                                </p>
                                <p className='mt-4 text-3xl text-zinc-100 font-semibold mb-4'>Price :&#8377; {data.price}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !data && <div className='bg-zinc-900 h-screen flex items-center justify-center'>
                    <Loader />
                </div>
            }
        </>
    )
}

export default ViewBookDetails
