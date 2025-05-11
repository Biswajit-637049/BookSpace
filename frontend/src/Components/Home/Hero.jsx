export function Hero() {
    return (
        <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center px-10">
            <div className=" w-full lg:w-3/6 flex flex-col lg:items-start justify-center">
                <h1 className=" font-semibold text-6xl text-red-500 text-center lg:text-left">
                    Discover Your Next Great Read
                </h1>
                <p className="mt-4 text-xl text-white-400 text-center lg:text-left">
                    Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
                </p>
                <div className="mt-8">
                    <button className="text-yellow-200 text-xl lg:text-2xl font-semibold border border-yellow-200 px-10 py-2 hover:bg-red-500 rounded-full">
                        Discovers Books
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-3/6 lg:h-[100%] flex justify-center" style={{ height: 500 }}>
                <img src="main.jpg" alt="main" style={{ width: 650 }} />
            </div>
        </div>
    )
}