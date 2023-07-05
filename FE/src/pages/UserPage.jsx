import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BookCard from "../comp/BookCard"
import { useSelector } from "react-redux";

const User = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([]);
    const { currentAcc } = useSelector((state) => state.customer)
    useEffect(() => {
        console.log(currentAcc)
        if (!currentAcc.idAccount) {
            navigate('/')
        }
    },[])
    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setBooks(data);
            })
            .catch(err => console.log(err));
    }, []);
    console.log(books)
    return (
        <>
            <div className="flex flex-wrap gap-8" >

                {books.map((book) =>
                    <BookCard
                        key={book.idBook}
                        book={book}
                    />
                )}

            </div>
            <div className='fixed right-3 bottom-3 w-14 h-14 hover:scale-110 transform transition duration-300 border-2 rounded-full border-black' onClick={()=>{navigate('/cart')}}>
                <img src='https://i.pinimg.com/564x/9a/fb/69/9afb69eb28d4a1b998cfbf81a3e313b0.jpg' className='p-2'></img>
            </div>
        </>
    )
}
export default User