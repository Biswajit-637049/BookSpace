import { Outlet } from "react-router-dom";
import Sidebar from "../Components/profile/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import Loder from "../Components/loader/Loader"
import { useState } from "react";
import MobileNav from "../Components/profile/MobileNav";
export function Profile() {
    const [Profile, setProfile] = useState({});
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    useEffect(() => {
        axios.get(`http://localhost:1000/api/v1/get-user-information`, { headers })
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => console.error(err));
    }, [])
    return (
        <div className="bg-zinc-800 px-2 md:px-12 flex text-white flex-col md:flex-row py-8 gap-4 h-auto">
            {!Profile ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loder />
                </div>
            ) : (
                <>
                    <div className="w-full md:w-[20%] h-[100vh]">
                        <Sidebar data={Profile} />
                        <MobileNav/>
                    </div>
                    <div className="w-full md:w-5/6 h-[94%] overflow-auto">
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    )
}