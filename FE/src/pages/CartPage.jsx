import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {upadteCart} from "../redux/features/customerSlice"
const CartPage = () => {
    const navigate = useNavigate()
    const { currentAcc } = useSelector((state) => state.customer)
    const { currentCart } = useSelector((state) => state.customer)
    const [order, setOrder] = useState([])
    const [active, setActive] = useState(false)
    const [booksInCart, setBooksInCart] = useState([...currentCart])
    const dispatch=useDispatch()
    const [check,setCheck]= useState(false);
    useEffect(() => {
        console.log(currentAcc)
        if (!currentAcc.idAccount) {
            navigate('/')
        }
    },[])
    useEffect(() => {
        fetch(`http://localhost:8080/order/${currentAcc.idAccount}`)
            .then(response => response.json())
            .then(data => {
                setOrder(data);
            })
            .catch(err => console.log(err));
    }, []);
    function handleDelete(Book) {
        const filteredArr = booksInCart.filter(item => item.book.idBook !== Book);
        dispatch(upadteCart(filteredArr))
        setBooksInCart(filteredArr)
    }
    function handleChange(Quantity, book) {
        const updatedArr = booksInCart.map(item => {
            if (item.book.idBook === book) {
                return { ...item, quantity: Quantity };
            }
            return item;
        });
        dispatch(upadteCart(updatedArr))
        setBooksInCart(updatedArr)
    }
    function handleCancel(idorder) {
        fetch(`http://localhost:8080/cancelOrder/${idorder}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    fetch(`http://localhost:8080/order/${currentAcc.idAccount}`)
                        .then(response => response.json())
                        .then(data => {
                            setOrder(data);
                        })
                        .catch(err => console.log(err));
                } else {
                    alert('Vãi ò lỗi r.')
                }
            })
            .catch(err => console.log(err));
    }
    var totalPresent = booksInCart.reduce((total, order) => total + order.book.bookPrice * order.quantity, 0);

    function handleBuy() {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        if(booksInCart.length==0){
            alert("Ko có sách để mua");
            return;
        }
        const buyList = booksInCart.map(item => {
            return { 'idorder': null, 'idAccount': currentAcc.idAccount, 'idBook': item.book.idBook, 'bookName': item.book.bookName, 'author': item.book.author, 'dateOrder': dateString, 'status': "Pending", 'quantity': item.quantity };
        });
        fetch('http://localhost:8080/newOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buyList)
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý phản hồi từ server
                
            })
            .catch(err => {setCheck(true);alert("Mua hàng thành công.")});
        
    }
    if(check){
        dispatch(upadteCart([]))
        navigate(`/${currentAcc.accountRole}`)
    }
    return (
        <div className={`relative w-full`}>
            <div className="flex w-full absolute z-0">
                <button className={`btn !round-top !w-1/6 ${!active ? "!text-white !bg-162938" : "!text-black !bg-white"}`} onClick={() => { setActive(!active) }}>Cart</button>
                <button className={`btn !round-top !w-1/6 ${active ? "!text-white !bg-162938" : "!text-black !bg-white"}`} onClick={() => { setActive(!active) }}>Order status</button>
            </div>
            <div className={`row w-full mt-10 !ml-0 !mr-0 bg-white border-width-30 border-black rounded-lg z-10 relative ${!active ? "" : "hidden"}`}>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Book</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            booksInCart.map((bookIncart, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="text-left">
                                        <h1 className="text-lg font-medium">{bookIncart.book.bookName}</h1>
                                        <h3>{bookIncart.book.author}</h3>
                                    </td>
                                    <td>{bookIncart.book.bookPrice}</td>
                                    <td><input type="number" value={bookIncart.quantity} onChange={(e) => { handleChange(parseInt(e.target.value, 10), bookIncart.book.idBook) }} /></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDelete(bookIncart.book.idBook)}>Delete</button>

                                    </td>
                                </tr>
                            ))
                        }
                        <tr   >
                            <td colSpan="1">Tổng tiền</td>
                            <td align="center" colSpan='3'>{totalPresent}</td>
                            <td align="center" colSpan='1'><button type="button" class="btn btn-success" onClick={() => { handleBuy() }}>Buy</button></td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className={`row w-full mt-10 !ml-0 !mr-0 bg-white border-width-30 border-black rounded-lg z-10 relative ${active ? "" : "hidden"}`}>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Book</th>
                            <th>Quantity</th>
                            <th>Order date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            order.map((book, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="text-left">
                                        <h1 className="text-lg font-medium">{book.bookName}</h1>
                                        <h3>{book.author}</h3>
                                    </td>
                                    <td>{book.quantity}</td>
                                    <td>{book.dateOrder}</td>
                                    <td>{book.status}</td>
                                    <td>
                                        {book.status === 'Pending' &&
                                            <button className='btn btn-danger' onClick={() => handleCancel(book.idorder)}>Cancel</button>
                                        }
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
export default CartPage