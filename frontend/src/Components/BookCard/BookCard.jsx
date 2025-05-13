import axios from "axios";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };
  function handleRemoveBook() {
    axios.delete(`http://localhost:1000/api/v1/delete-book-from-favourite`, { headers })
      .then((response) => {
        alert(response.data.message);
      })
  }
  return (
    <>
      <div className="bg-zinc-700 p-4 rounded h-[60vh] flex flex-col justify-between">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="">
            <div className="bg-zinc-800 rounded flex items-center justify-center">
              <img src={data.url} alt="" className="h-[28vh]" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-zinc-200 bg-zinc-800 px-4 py-2 rounded-lg shadow-md text-center hover:text-emerald-400 transition duration-300">
              {data.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-zinc-300 bg-zinc-800 px-3 py-2 rounded-lg shadow-sm hover:bg-zinc-700 transition duration-300">
              by <span className="text-emerald-400">{data.author}</span>
            </p>
            <p className="text-3xl font-bold mt-2 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400 transition-transform transform hover:scale-110">
              ₹{data.price}
            </p>
          </div>
        </Link>
        {
          favourite && (
            <button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:cursor-pointer hover:from-red-600 hover:to-red-700 text-sm text-white font-semibold rounded-md w-full shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out" onClick={handleRemoveBook}>
              Remove from Favourite
            </button>
          )
        }
      </div>
    </>
  )
}

export default BookCard
