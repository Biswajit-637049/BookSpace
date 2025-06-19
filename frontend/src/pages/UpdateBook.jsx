import axios from "axios"
import { useFormik } from "formik"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const UpdateBook = () => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    const navigate = useNavigate();
    const [Data, setData] = useState({ url: "", title: "", author: "", price: 0, desc: "", language: "" });
    let { id } = useParams();
    useEffect(() => {
        axios.get(`https://bookspace-72oz.onrender.com/api/v1/get-book-by-id/${id}`)
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    }, [id]);
    const formik = useFormik({
        initialValues: {
            url: Data.url,
            title: Data.title,
            author: Data.author,
            price: Data.price,
            desc: Data.desc,
            language: Data.language
        },
        onSubmit: (book) => {
            axios.put(`https://bookspace-72oz.onrender.com/api/v1/update-book`, book, { headers: { ...headers, bookid: id } })
                .then((response) => {
                    alert(response.data.message);
                    navigate("/all-books");
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.response?.data?.message || "Failed to add book");
                });
        },
        enableReinitialize: true // IMPORTANT: allows formik to reset when initialValues change
    });
    return (
        <div className="p-4 bg-gray-900 min-h-screen flex items-center justify-center">
            <form onSubmit={formik.handleSubmit} className="max-w-md w-full bg-zinc-800 rounded-lg shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-zinc-100 mb-4 text-center">Update Book</h2>

                <div>
                    <label className="text-zinc-300 block mb-1">Image URL:</label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        name="url"
                        value={formik.values.url}
                        placeholder="Enter image URL"
                        className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                </div>

                <div>
                    <label className="text-zinc-300 block mb-1">Title of Book:</label>
                    <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        placeholder="Enter book title"
                        className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                </div>

                <div>
                    <label className="text-zinc-300 block mb-1">Author of Book:</label>
                    <input
                        type="text"
                        name="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        placeholder="Enter author name"
                        className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                </div>

                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="text-zinc-300 block mb-1">Language:</label>
                        <input
                            type="text"
                            name="language"
                            value={formik.values.language}
                            onChange={formik.handleChange}
                            placeholder="Enter book language"
                            className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-zinc-300 block mb-1">Price:</label>
                        <input
                            type="text"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            placeholder="Enter book price"
                            className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-zinc-300 block mb-1">Description:</label>
                    <textarea
                        name="desc"
                        onChange={formik.handleChange}
                        placeholder="Enter book description"
                        value={formik.values.desc}
                        className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:brightness-110 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                    Update Book
                </button>
            </form>
        </div>
    )
}

export default UpdateBook
