import { useState } from "react"
import Loader from "../Components/loader/Loader";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

export function Cart() {
    const [Cart, setCart] = useState();
    const [Total, setTotal] = useState(0);
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
        axios.get(`https://bookspace-72oz.onrender.com/api/v1/get-user-cart`, { headers })
            .then((response) => {
                setCart(response.data.data)
            })
            .catch((err) => {
                console.log(`favourite data is not come :`, err);
            })
    }, [Cart]);
    function removeCart(id) {
        axios.put(`https://bookspace-72oz.onrender.com/api/v1/remove-from-cart/${id}`, {}, { headers })//url,body,header(body for empty {} not defined server error is come)
            .then((response) => {
                alert(response.data.message);
            })
    };
    function placeOrder() {
        axios.post(`https://bookspace-72oz.onrender.com/api/v1/place-order`, { order: Cart }, { headers })
            .then((response) => {
                alert(response.data.message);
                navigate("/profile/orderhistory");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        if (Cart && Cart.length > 0) {
            let total = 0;
            Cart.map((items) => {
                total = total + items.price;
            });
            setTotal(total);
        }
    }, [Cart]);
    return (
        <div className="bg-zinc-900 px-12 h-[70vh] py-19">
            {!Cart && <div className="flex justify-center h-[100%] items-center"><Loader /></div>}
            {Cart && Cart.length === 0 && (
                <div className="flex items-center h-80vh flex-col justify-center">
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Add into Cart</h1>
                        <img src="/cart.jpg" className="h-[40vh] mt-5" alt="empty cart" />
                    </div>
                </div>
            )}
            {Cart && Cart.length > 0 && (
                <>
                    <h1 className="text-5xl font-semibold text-center text-red-500 mb-8">Your Cart</h1>
                    <div className="h-[100%] overflow-auto">
                        {
                            Cart.map((items, i) => (
                                <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
                                    <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] " />
                                    <div className="w-full md:w-auto ms-3">
                                        <h1 className="text-2xl font-semibold text-zinc-100 text-start mt-2 md:mt-0">{items.title}</h1>
                                        <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{items.desc.slice(0, 100)}...</p>
                                        <p className="text-normal text-zinc-300 mt-2 hidden lg:hidden md:block">{items.desc.slice(0, 65)}...</p>
                                        <p className="text-normal text-zinc-300 mt-2 block md:hidden">{items.desc.slice(0, 100)}...</p>
                                    </div>
                                    <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                        <h2 className="text-zinc-100 text-3xl font-semibold flex">&#8377;{items.price}</h2>
                                        <button
                                            className="group hover:cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-red-100 px-4 py-2 ms-12 text-red-700 border border-red-700 transition-all duration-300 hover:bg-red-700 hover:text-white shadow-md hover:shadow-lg"
                                            onClick={() => removeCart(items._id)}
                                        >
                                            <span className="absolute inset-0 scale-0 bg-red-700 opacity-20 transition-transform duration-300 group-hover:scale-100" />
                                            <AiFillDelete className="relative z-10 text-xl transition-transform duration-300 group-hover:scale-125" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="flex items-center justify-end w-full mt-4">
                            <div className="p-4 bg-zinc-600 rounded">
                                <h1 className="text-zinc-100 text-3xl font-semibold">Total Amount</h1>
                                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-zinc-100 p-4 bg-zinc-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-zinc-200">{Cart.length} Books</h2>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-yellow-500">&#8377; {Total}</h2>
                                </div>
                                <div className="w-[100%] mt-3">
                                    <button
                                        onClick={placeOrder}
                                        className="group relative inline-flex items-center hover:cursor-pointer justify-center w-full px-6 py-3 overflow-hidden text-white transition duration-300 ease-out bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-xl shadow-lg hover:from-zinc-800 hover:to-zinc-600 hover:shadow-2xl"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white opacity-10 group-hover:-translate-x-0" />
                                        <span className="relative z-10 text-lg font-semibold tracking-wide">
                                            Place Your Order
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}