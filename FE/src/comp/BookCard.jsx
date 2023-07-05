import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    // console.log(book)
    return (
        <div className="flex flex-col w-[250px] p-4
  bg-white/5 rounded-lg border max-h-[500px]
  cursor-pointer hover:scale-110 transform transition duration-300">
            <div className="relative w-full  group ">
                <img className="max-w-full" src={book.bookImage} alt="book_img" />
            </div>
            {/* // cái div này là để chứa ảnh */}
            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-black truncate " >
                    {/* nếu text dài quá thì truncate sẽ làm nhiệm vụ cắt bớt đi */}
                    <Link to={`/book/${book?.idBook}`} className="text-decoration-none">
                        {book.bookName}
                    </Link>
                </p>
                <p className="text-sm truncate text-black mt-1">
                    <p >
                        {book.author}
                    </p>
                </p>
            </div>

        </div>
    )
}
export default BookCard;