import React, { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './Components/Nvabar/Navbar.jsx'
import { Footer } from './Components/Footer/Footer.jsx'
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/Login.jsx"
import { AllBooks } from "./pages/AllBook.jsx"
import { Signin } from "./pages/Signin.jsx"
import { Cart } from "./pages/cart.jsx"
import { Profile } from "./pages/Profile.jsx"
import ViewBookDetails from "./Components/ViewBookDetails/ViewBookDetails.jsx"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth.js"
import Favourite from "./Components/profile/Favourite.jsx"
import UserOrderHistory from "./Components/profile/UserOrderHistory.jsx"
import Settings from "./Components/profile/Settings.jsx"
import AllOrder from "./pages/AllOrder.jsx"
import AddBook from "./pages/AddBook.jsx"
import UpdateBook from "./pages/UpdateBook.jsx"
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);
  const handleContextMenu = (e) => {
   e.preventDefault();
    alert("double click not allow by Banty");// Prevent right-click context menu
  };
    const handleCopy = (e) => {
    e.preventDefault();
    alert("Copying is disabled by Banty.");
  };

  return (
    <div onContextMenu={handleContextMenu} onCopy={handleCopy}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} >
          {role === "user" ? <Route index element={<Favourite />} /> : <Route index element={<AllOrder />} />}    {/*index means by deafult page this page run*/}
          {role === "admin" && (<Route path="/profile/add-book" element={<AddBook />} />)}
          <Route path="/profile/orderhistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
