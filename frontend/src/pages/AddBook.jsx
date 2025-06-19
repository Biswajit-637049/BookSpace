import axios from "axios"
import { useFormik } from "formik"
import *as yup from "yup";
const AddBook = () => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    const formik = useFormik({
        initialValues: {
            url: "",
            title: "",
            author: "",
            price: "",
            desc: "",
            language: ""
        },
        validationSchema: yup.object({
            url: yup.string().required("url is required"),
            title: yup.string().required("title is required"),
            author: yup.string().required("author is required"),
            price: yup.string().required("price is required"),
            desc: yup.string().required("desc is required"),
            language: yup.string().required("language is required")
        }),
        onSubmit: (book,{resetForm}) => {
            axios.post(`https://bookspace-72oz.onrender.com/api/v1/add-book`, book, { headers })
                .then((response) => {
                    alert(response.data.message);
                    resetForm();//This clears the form fields
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.response?.data?.message || "Failed to add book");
                });
        }
    })
    return (
        // <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg space-y-4">
        //     <h2 className="text-2xl font-bold text-zinc-100 mb-4 text-center">Add a New Book</h2>
        //     <div>
        //         <label className="text-zinc-300 block mb-1">Image URL :</label>
        //         <input
        //             onChange={formik.handleChange}
        //             type="text"
        //             name="url"
        //             placeholder="Enter image URL"
        //             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //         />
        //         <span className="text-red-700 text-sm">{formik.errors.url}</span>
        //     </div>

        //     <div>
        //         <label className="text-zinc-300 block mb-1">Title of Book:</label>
        //         <input
        //             type="text"
        //             name="title"
        //             onChange={formik.handleChange}
        //             placeholder="Enter book title"
        //             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //         />
        //         <span className="text-red-700 text-sm">{formik.errors.title}</span>
        //     </div>

        //     <div>
        //         <label className="text-zinc-300 block mb-1">Author of Book:</label>
        //         <input
        //             type="text"
        //             name="author"
        //             onChange={formik.handleChange}
        //             placeholder="Enter author name"
        //             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //         />
        //         <span className="text-red-700 text-sm">{formik.errors.author}</span>
        //     </div>

        //     <div className='flex'>
        //         <div>
        //             <label className="text-zinc-300 block mb-1">Language of Book:</label>
        //             <input
        //                 type="text"
        //                 name="language"
        //                 onChange={formik.handleChange}
        //                 placeholder="Enter book language"
        //                 className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //             />
        //             <span className="text-red-700 text-sm">{formik.errors.language}</span>
        //         </div>

        //         <div className="ms-2">
        //             <label className="text-zinc-300 block mb-1">Price of Book:</label>
        //             <input
        //                 type="text"
        //                 name="price"
        //                 onChange={formik.handleChange}
        //                 placeholder="Enter book price"
        //                 className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //             />
        //             <span className="text-red-700 text-sm">{formik.errors.price}</span>
        //         </div>
        //     </div>

        //     <div>
        //         <label className="text-zinc-300 block mb-1">Description of Book:</label>
        //         <textarea
        //             name="desc"
        //             onChange={formik.handleChange}
        //             placeholder="Enter book description"
        //             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-zinc-600"
        //             rows="3"
        //         />
        //         <span className="text-red-700 text-sm">{formik.errors.desc}</span>
        //     </div>

        //     <button
        //         type="submit"
        //         className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:brightness-110 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
        //     >
        //         Add Book
        //     </button>
        // </form> own
        <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl p-6 space-y-5 animate-fade-in">
            <h2 className="text-3xl font-bold text-zinc-100 text-center">📚 Add a New Book</h2>

            {/* Image URL */}
            <div>
                <label className="text-sm text-zinc-300 block mb-1">Image URL</label>
                <input
                    onChange={formik.handleChange}
                    type="text"
                    name="url"
                     value={formik.values.url}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                />
                <span className="text-red-500 text-xs">{formik.errors.url}</span>
            </div>

            {/* Title */}
            <div>
                <label className="text-sm text-zinc-300 block mb-1">Title of Book</label>
                <input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                     value={formik.values.title}
                    placeholder="Book Title"
                    className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                />
                <span className="text-red-500 text-xs">{formik.errors.title}</span>
            </div>

            {/* Author */}
            <div>
                <label className="text-sm text-zinc-300 block mb-1">Author</label>
                <input
                    type="text"
                    name="author"
                     value={formik.values.author}
                    onChange={formik.handleChange}
                    placeholder="Author Name"
                    className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                />
                <span className="text-red-500 text-xs">{formik.errors.author}</span>
            </div>

            {/* Language and Price */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="text-sm text-zinc-300 block mb-1">Language</label>
                    <input
                        type="text"
                        name="language"
                        onChange={formik.handleChange}
                         value={formik.values.language}
                        placeholder="English"
                        className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                    />
                    <span className="text-red-500 text-xs">{formik.errors.language}</span>
                </div>
                <div className="flex-1">
                    <label className="text-sm text-zinc-300 block mb-1">Price (₹)</label>
                    <input
                        type="text"
                        name="price"
                         value={formik.values.price}
                        onChange={formik.handleChange}
                        placeholder="199"
                        className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                    />
                    <span className="text-red-500 text-xs">{formik.errors.price}</span>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="text-sm text-zinc-300 block mb-1">Description</label>
                <textarea
                    name="desc"
                    onChange={formik.handleChange}
                     value={formik.values.desc}
                    placeholder="Enter a brief summary of the book..."
                    rows="4"
                    className="w-full bg-zinc-950 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300 resize-none"
                />
                <span className="text-red-500 text-xs">{formik.errors.desc}</span>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
                ➕ Add Book
            </button>
        </form>
    )
}

export default AddBook
