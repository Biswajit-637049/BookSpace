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

      <div className="bg-zinc-700 p-4 rounded">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="">
            <div className="bg-zinc-800 rounded flex items-center justify-center">
              <img src={data.url} alt="" className="h-[28vh]" />
            </div>
            <h2 className="mt-4 textxl font-semibold text-zinc-200">{data.title}</h2>
            <p className="text-zinc-400 font-semibold mt-2">by {data.author}</p>
            <p className="text-zinc-200 font-semibold mt-2">&#8377; {data.price}</p>
          </div>
        </Link>
        {
          favourite && (
            <button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:cursor-pointer hover:from-red-600 hover:to-red-700 text-sm text-white font-semibold rounded-md w-full shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out mt-3" onClick={handleRemoveBook}>
              Remove from Favourite
            </button>
          )
        }
      </div>
    </>
  )
}

export default BookCard
