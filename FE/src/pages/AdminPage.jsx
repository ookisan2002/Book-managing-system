import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

const AdminPage = () => {
    const navigate = useNavigate()
    const { currentAcc } = useSelector((state) => state.customer)
    const [books, setBooks] = useState([])
    useEffect(() => {
        console.log(currentAcc)
        if (!currentAcc.idAccount) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        fetch(`http://localhost:8080/books`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setBooks(data);
            })
            .catch(err => console.log(err));
    }, []);
    function handleDelete(idBook) {
        const result = window.confirm('Đã chắc là xóa chưa?');
        if (result) {
            fetch(`http://localhost:8080/deleteBook/${idBook}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Xóa sách thành công');
                        alert('Xóa sách thành công');
                        fetch(`http://localhost:8080/books`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                setBooks(data);
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log('Xóa sách không thành công');
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log('Hủy');
        }
    }
    return (
        <div>
            <div className="w-full flex mb-3">
                <button type="button" class="btn btn-info !w-1/6" onClick={() => { navigate(`/bookByADMIN/${0}`) }}>Add book</button>
            </div>
            <div className={`row `}>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Image</th>
                            <th>Book</th>
                            <th>Category</th>
                            <th>Released date</th>
                            <th>Pages</th>
                            <th>Sold</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            books.map((book, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td ><img src={book.bookImage} alt=""  className="w-30 h-48 mr-auto ml-auto"/></td>
                                    <td className="text-left">
                                        <h1 className="text-lg font-medium">{book.bookName}</h1>
                                        <h3>{book.author}</h3>
                                    </td>
                                    <td>{book.category}</td>
                                    <td>{book.relatedDate}</td>
                                    <td>{book.page}</td>
                                    <td>{book.sold}</td>
                                    <td className="flex">
                                        <button type="button" class="btn btn-info mr-2" onClick={() => { navigate(`/bookByADMIN/${book.idBook}`) }}>Info</button>
                                        <button className='btn btn-danger' onClick={() => handleDelete(book.idBook)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default AdminPage;