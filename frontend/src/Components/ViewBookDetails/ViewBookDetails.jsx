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
    const navigate = useNavigate("");
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
    function deleteBook() {
        axios.delete(`http://localhost:1000/api/v1/delete-book`, { headers })
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
                            {/*User Role*/}
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
                                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg px-5 py-3 ms-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95 flex hover:cursor-pointer items-center"
                                            onClick={handleCart}
                                        >
                                            <FaShoppingCart className="text-2xl" />
                                            <span className="ms-1">Add to cart</span>
                                        </button>
                                    </div>
                                )
                            }
                            {/*Admin Role*/}
                            {
                                isLoggedIn === true && role === "admin" && (
                                    <div className='mt-5 flex'>
                                        <Link to={`/updateBook/${id}`} className="flex items-center bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl text-lg px-5 py-2 hover:scale-105 hover:cursor-pointer transform transition shadow">
                                            <FaEdit className="mr-2 text-xl" />
                                            <span>Edit</span>
                                        </Link>
                                        <button onClick={deleteBook} className="flex hover:cursor-pointer items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl text-lg px-5 py-2 ms-4 hover:scale-105 transform transition shadow">
                                            <MdDeleteOutline className="mr-2 text-xl" />
                                            <span>Delete Book</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className='p-4 w-full lg:w-3/6 flex justify-center items-center'>
                            <div>
                                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-md tracking-tight mb-4">
                                    {data.title}
                                </h1>
                                <p className="text-zinc-400 italic mb-4">by <span className="text-zinc-200 font-medium">{data.author}</span></p>
                                <p className="mt-6 text-lg text-zinc-300 bg-zinc-800/50 px-5 py-4 rounded-xl shadow-sm leading-relaxed tracking-wide border border-zinc-700">
                                    {data.desc}
                                </p>
                                <p className="mt-4 flex items-center hover:cursor-pointer justify-start gap-3 text-zinc-200 bg-zinc-800 px-4 py-2 rounded-xl shadow-sm hover:bg-zinc-700 transition-colors duration-200">
                                    <GrLanguage className="text-lg text-blue-400" />
                                    <span className="font-medium tracking-wide">{data.language}</span>
                                </p>
                                <div className="mt-6 mb-6 p-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-2xl shadow-md">
                                    <p className="text-4xl text-emerald-400 font-bold tracking-wide flex items-center gap-2">
                                        <span className="text-zinc-300">Price:</span>
                                        ₹{data.price}
                                    </p>
                                </div>
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
