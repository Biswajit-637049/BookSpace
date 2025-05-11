import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

export function Navbar() {
  const [navitem, setNavitem] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [mobileNav, setMobileNav] = useState("hidden");
  const role = localStorage.getItem("role"); // make sure you store 'admin' or 'user' here
  useEffect(() => {
    axios.get('/Navbar.json')
      .then(response => {
        let items = Array.isArray(response.data) ? response.data : [];

        if (!isLoggedIn) {
          // Not logged in → show only Home + AllBooks
          items = items.filter(item => item.navbaritem === "Home" || item.navbaritem === "AllBooks");
        } else if (role === "admin") {
          // Admin logged in → replace 'Profile' with 'Admin Profile'
          items = items.filter(item => item.navbaritem !== "Profile");
        } else {
          // Normal user logged in → remove 'Admin Profile'
          items = items.filter(item => item.navbaritem !== "Admin Profile");
        }

        setNavitem(items);
      });
  }, [isLoggedIn, role]);
  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 bg-zinc-700 text-white relative z-50">
        <Link to={"/"} className="flex">
          <span ><img src="/Brand-logo.jpeg" className="rounded-xl border-2  border-red-600 " width={40} height={60} /></span>
          <span className="font-semibold text-3xl ms-2"><span className="text-red-400">B</span>ookSpace</span>
        </Link>
        <div className="md:flex block gap-4 font-medium">
          <div className="hidden md:flex">
            {
              navitem.map((navlist, i) => (
                <div className="flex items-center" key={i}>
                  {
                    navlist.navbaritem === "Profile" || navlist.navbaritem === "Admin Profile" ? (
                      <Link to={navlist.link} key={i} className="m-2 p-2 hover:text-zinc-800 hover:bg-white rounded border border-blue-500 transition-all duration-300">{navlist.navbaritem}</Link>
                    ) :
                      (
                        <Link to={navlist.link} key={i} className="m-2 hover:text-red-400 transition-all duration-300">{navlist.navbaritem}</Link>
                      )
                  }
                </div>
              )
              )
            }
          </div>
          {
            isLoggedIn == false ?
              (
                <>
                  <div className="hidden md:flex gap-4">
                    <Link to="/Login" className="group inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden">
                      <span className="block rounded-xs bg-black px-8 py-3 text-sm font-medium group-hover:bg-transparent">Login</span>
                    </Link>
                    <Link to="/Signin" className="group inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden">
                      <span className="block rounded-xs bg-black px-8 py-3 text-sm font-medium group-hover:bg-transparent">Sign in</span>
                    </Link>
                  </div>
                </>
              ) :
              (
                <>
                </>
              )
          }
          <button className="md:hidden  text-2xl hover:text-red-400" onClick={() => (mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}><FaGripLines /></button>
        </div>
      </nav>
      <div className={`${mobileNav} bg-red-500 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {
          navitem.map((navlist, i) =>
            <Link to={navlist.link} key={i} className="m-2 text-white text-4xl font-semibold hover:text-red-700 transition-all duration-300">{navlist.navbaritem}</Link>
          )
        }
        <Link to="/Login" className="group inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden">
          <span className="block rounded-xs bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">Login</span>
        </Link>
        <Link to="/Signin" className="inline-block mt-6 rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] text-white focus:ring-3 focus:outline-hidden">
          <span className="block rounded bg-transparent px-8 py-3 text-sm font-medium ">Signin</span>
        </Link>
      </div>
    </>
  )
}