import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import *as yup from "yup";
import axios from "axios";

export function Signin() {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            address: ''
        },
        validationSchema: yup.object({
            username: yup.string().required("Username is required"),
            email: yup.string().email("Invalid Email").required("email must be type").matches(/@gmail\.com/, 'Email must end with gmail.com'),
            password: yup.string().required("User Password must be type").min(5, 'Password must be at least 5 characters long')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
            address: yup.string().required("Address is required")
        }),
        onSubmit: (user) => {
            axios.post(`https://bookspace-72oz.onrender.com/api/v1/sign-up`, user)
                .then(() => {
                  //  console.log("registered");
                    alert("Registered Successfully");
                    navigate('/Login');
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        }
    });

    return (
        <div className="flex items-center justify-center bg-gray-600">
            <div className="bg-white p-8 rounded-lg w-full max-w-md m-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div>
                         {/* Username */}
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            User Name :
                        </label>
                        <input
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter User Name"
                        />
                        <span className="text-red-700 text-sm">{formik.errors.username}</span>
                    </div>
                    <div>
                        {/* Email */}
                        <label htmlFor="Email">
                            <span className="text-sm font-medium text-gray-700"> Email: </span>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={formik.handleChange}
                                    className="mt-0.5 w-full rounded border-gray-500 pe-8 shadow-sm h-[6vh] sm:text-sm"
                                />

                                <span className="absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"             // use from hyperui
                                            strokeLinejoin="round"
                                            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </label>
                        <span className="text-red-700 text-sm">{formik.errors.email}</span>
                    </div>
                    <div>
                        {/* Password */}
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password :
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password"
                        />
                        <span className="text-red-700 text-sm">{formik.errors.password}</span>
                    </div>
                    <div>
                        {/* Address */}
                        <label htmlFor="Notes">
                            <span className="text-sm font-medium text-gray-700"> Address: </span>

                            <textarea
                                name="address"
                                onChange={formik.handleChange}
                                className="mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
                                rows="4"
                            ></textarea>
                        </label>
                        <span className="text-red-700 text-sm">{formik.errors.address}</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?
                        <Link to="/Login" className="text-blue-600 ms-2 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}