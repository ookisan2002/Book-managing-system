import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";

import {addGoods} from "../redux/features/customerSlice"
import Comment from "./Comment";

const DetailsHeader = ({ book }) => {
  const [cmtList, setCmtList] = useState([])
  const { currentAcc } = useSelector((state) => state.customer)
  const [submit, setSubmit] = useState(false)
  const [myCmt, setMyCmt] = useState({ idComment: 0, idBook: book.idBook, content: "", star: 0, ownerEmail: currentAcc.ownerEmail })
  const dispatch=useDispatch();
  useEffect(() => {
    fetch(`http://localhost:8080/cmt/${book.idBook}`)
      .then(response => response.json())
      .then(data => {

        console.log(data)
        setCmtList(data);
      })
      .catch(err => console.log(err));
  }, [book,submit]);
  console.log("run")

  function handleBuy(){
    dispatch(addGoods({book:book, quantity: 1}))
    alert("Thêm vào giỏ hàng thành công.")
  }

  function handleCmt() {
    console.log(myCmt)
    if (myCmt.star != 0) {
      fetch('http://localhost:8080/newCmt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCmt)
      })
        .then(response => response.json())
        .then(data => {
          // Xử lý phản hồi từ server
          if (data) {
            alert("Đăng kí thành công.")
          } else {
            alert("Đăng kí không thành công.")
          }
        })
        .catch(err => {
          setSubmit(!submit)
          setMyCmt({...myCmt, idComment: 0, idBook: book.idBook, content: "",  ownerEmail: currentAcc.ownerEmail })
        })
    } else {
      alert("Xin hãy đánh giá sao!")
    }
  }
  return (
    <>
      <div className="bg-slate-400 flex border rounded-md h-3/4">
        <div className="columns-1 w-1/2 h-full">
          <img src={book.bookImage} className="h-full w-full" alt="" />
        </div>
        <div className="columns-1 w-1/2 p-7 relative">
          <h1 className="text-4xl font-bold text-left mb-3">{book.bookName}</h1>
          <h2 className="text-left text-2xl text-slate-600 mb-2">By {book.author}</h2>
          <h2 className="text-left text-2xl text-slate-600 mb-2">Pages: {book.page}</h2>
          <h2 className="text-left text-2xl text-slate-600 mb-2">Relate: {book.relatedDate}</h2>
          <h2 className="text-left text-2xl text-slate-600 mb-2">Category: {book.category}</h2>
          <h2 className="text-left text-2xl text-slate-600 mb-2">Cursory: {book.cursory}</h2>
          <div className="absolute bottom-3 content-center w-11/12">
            <h2 className="text-left text-3xl mb-2">Price: {book.bookPrice} VND</h2>
            <button type="submit" onClick={()=>{handleBuy()}} class="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
          </div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="bag nu rw uk"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="bag nu rw uk"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg> */}
        </div>

      </div>
      <div className="mt-4 flex flex-col">
        <h1 className="text-4xl font-bold text-left mb-1">Feedbacks</h1>
        <div className="input-box m-0 text-3xl">
          <span className="icon">
            <i className='bx bx-envelope' ></i>
          </span>
          <input id="email" type="text" value={myCmt.content} placeholder="Enter your comment..." onChange={(e) => { setMyCmt({ ...myCmt, content: e.target.value, idBook:book.idBook}) }} />
        </div>
        <div class="star-rating flex flex-row-reverse justify-start">
          <input type="radio" id="star5" name="rating" value="5" className=" hidden" onClick={() => { setMyCmt({ ...myCmt, star: 5 }) }} />
          <label for="star5" className=" star text-5xl mr-auto">&#9733;</label>
          <input type="radio" id="star4" name="rating" value="4" className=" hidden" onClick={() => { setMyCmt({ ...myCmt, star: 4 }) }} />
          <label for="star4" className=" star text-5xl">&#9733;</label>
          <input type="radio" id="star3" name="rating" value="3" className=" hidden" onClick={() => { setMyCmt({ ...myCmt, star: 3 }) }} />
          <label for="star3" className=" star text-5xl">&#9733;</label>
          <input type="radio" id="star2" name="rating" value="2" className=" hidden" onClick={() => { setMyCmt({ ...myCmt, star: 2 }) }} />
          <label for="star2" className=" star text-5xl">&#9733;</label>
          <input type="radio" id="star1" name="rating" value="1" className=" hidden" onClick={() => { setMyCmt({ ...myCmt, star: 1 }) }} />
          <label for="star1" className=" star text-5xl">&#9733;</label>
        </div>
        <button type="button" class="btn btn-primary !w-1/12" onClick={() => { handleCmt() }}>Send</button>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-left">Customer comments:</h1>
        {cmtList.map((cmt) => (
          <Comment
            key={cmt.idComment}
            cmt={cmt}
          />
        ))}

      </div>
    </>



    // <div className="relative w-full flex flex-col">
    //   <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
    //   <div className="absolute inset-0 flex items-center">
    //     <img src={book.bookImage} alt="art"
    //       className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" />

    //     <div className="ml-5">
    //       <p className="font-bold sm:text-3xl text-xl text-white">{book.bookName}</p>
    //       <p className="text-base text-gray-400 mt-2">{book.author}</p>
    //       <p className="text-base text-gray-400 mt-2">
    //         {book.Category}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="w-full sm:h-44 h-24">

    //   </div>
    // </div>
  )
}


export default DetailsHeader;
