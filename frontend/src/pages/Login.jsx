import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import * as yup from "yup";
import { useDispatch } from "react-redux";
export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().required("username type must be same in signup"),
            password: yup.string().required("password type must be same in signup")
        }),
        onSubmit: (user, { resetForm }) => {
            axios.post(`https://bookspace-72oz.onrender.com/api/v1/sign-in`, user)
                .then((response) => {
                    dispatch(authActions.login()); // send login action to redux store
                    dispatch(authActions.changeRole(response.data.role)); // send change role action to redux store
                    // console.log(response.data);
                    localStorage.setItem("id", response.data.id);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.role);
                    resetForm(); // Clear the form fields after successful login
                    navigate("/profile");
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        }
    })
    return (
        <div className="flex items-center justify-center bg-gray-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md m-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to your account</h2>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div>
                        {/* Username */}
                        <label className="block text-sm font-medium text-gray-700">Username :</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Your Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-600 text-sm">{formik.errors.username}</span>
                    </div>
                    <div>
                        {/* Password */}
                        <label className="block text-sm font-medium text-gray-700">Password :</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Your Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-600 text-sm">{formik.errors.password}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4">
                    Don't have an account? <Link className="text-blue-500 hover:underline" to="/Signin">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}