import { RxCross1 } from "react-icons/rx";


const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
    return (
        <>
            <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}>
            </div>{" "}
            <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center backdrop-blur-lg`}>
                <div className="bg-white rounded-lg p-6 md:w-[50%] lg:w-[40%] w-[80%] text-zinc-800 shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-zinc-800">User Information</h1>
                        <button onClick={() => { setUserDiv("hidden") }} className="text-zinc-500 hover:text-red-500 transition duration-200">
                            <RxCross1 className="text-2xl" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <label className="block text-lg font-medium text-zinc-600">Username:</label>
                        <span className="block mt-1 text-zinc-800 text-xl">{userDivData.username}</span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-lg font-medium text-zinc-600">Email:</label>
                        <span className="block mt-1 text-zinc-800 text-xl font-semibold">{userDivData.email}</span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-lg font-medium text-zinc-600">Address:</label>
                        <span className="block mt-1 text-zinc-800 text-xl font-semibold">{userDivData.address}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SeeUserData
