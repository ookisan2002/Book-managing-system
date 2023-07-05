import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookDetailADMIN = () => {
    const navigate = useNavigate()
    const { id: idBook } = useParams();
    const { currentAcc } = useSelector((state) => state.customer)
    const [book, setBook] = useState({
        "idBook": idBook,
        "bookName": "",
        "author": "",
        "category": "",
        "bookImage": null,
        "relatedDate": "",
        "sold": 0,
        "page": 0,
        "bookPrice": 0,
        'cursory': ''
    })
    const [bookLst, setBookLst] = useState([])
    const [checkCreate, setCheckCreate] = useState(idBook === "0")
    useEffect(() => {

        if (!currentAcc.idAccount) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        if (idBook !== "0") {
            fetch(`http://localhost:8080/book/${idBook}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    setBook(data);
                    // console.log("data")
                })
                .catch(err => console.log(err));

        } else {
            fetch('http://localhost:8080/books')
                .then(response => response.json())
                .then(data => {
                    // data.forEach((obj) => {
                    //     const blob = "data:image/jpg;base64," + obj.bookImage;
                    //     obj.bookImage = blob;
                    // })
                    // console.log('data');
                    setBookLst(data);
                })
                .catch(err => console.log(err));
        }
    }, []);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0]);
        const reader = new FileReader();

        reader.onload = (e) => {
            console.log(e.target.result)
            setBook({ ...book, 'bookImage': e.target.result })
        };

        reader.readAsDataURL(file);
    };

      

    function handleCreate() {
        if (checkCreate) {
            if (book.bookName === "" || book.author === "" || book.cursory === "" || book.relatedDate === "" || book.page === 0 || book.category === "" || book.bookPrice === 0) {
                alert("Điền thiếu kìa cha!!!");
                return;
              }
            const result = window.confirm('Chắc chưa mà ấn?');
                if (result) {
                    if (idBook === "0") {
                        const filteredBooks = bookLst.filter((bookExist) => {
                            return bookExist.bookName === book.bookName && bookExist.author === book.author;
                        });
                        if(filteredBooks.length>0){
                            alert("Sách đã tồn tại")
                        }else{
                            fetch('http://localhost:8080/newBook', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(book)
                              })
                              .then(response => response.json())
                              .then(data => {
                                if(data){
                                    alert('Thêm thành công')
                                    navigate("/ADMIN")
                                }else{
                                    alert('Thêm không thành công')
                                }
                              })
                              .catch(error => {
                                console.error(error);
                              });
                        }
                    } else {
                        fetch('http://localhost:8080/edit', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(book)
                          })
                          .then(response => response.json())
                          .then(data => {
                            if(data){
                                alert('Sửa thành công')
                            }else{
                                alert('Sửa không thành công')
                            }
                          })
                          .catch(error => {
                            console.error(error);
                        });
                        navigate("/ADMIN")
                    }
                } else {
                  console.log('May vãi ò');
                }
        }else{
            setCheckCreate(!checkCreate);
        }

    }
    return (
        <div className="flex w-full bg-cyan-400 h-fit">
            <div className="flex flex-col p-6 w-1/2 border border-white">
                <div className="flex mb-4 w-full">
                    <div class="input-group input-group-sm mb-3 pr-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Tên sách</span>
                        </div>
                        <input type="text" value={book.bookName} class="form-control" onChange={(e) => { setBook({ ...book, 'bookName': e.target.value }) }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                    <div class="input-group input-group-sm mb-3 pl-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Tác giả</span>
                        </div>
                        <input type="text" class="form-control" value={book.author} aria-label="Small" onChange={(e) => { setBook({ ...book, 'author': e.target.value }) }} aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                </div>
                <h1 className="text-left text-white text-xl">Mô tả sách</h1>
                <textarea type="textarea" className="!h-72 mb-4" disabled={!checkCreate} value={book.cursory} onChange={(e) => { setBook({ ...book, 'cursory': e.target.value }) }} />
                <div className="flex mb-4 w-full">
                    <div class="input-group input-group-sm mb-3 pr-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Ngày phát hành</span>
                        </div>
                        <input type="date" class="form-control" onChange={(e) => { setBook({ ...book, 'relatedDate': e.target.value }) }} value={book.relatedDate} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                    <div class="input-group input-group-sm mb-3 pl-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Số trang</span>
                        </div>
                        <input type="text" class="form-control" onChange={(e) => { setBook({ ...book, 'page': e.target.value }) }} aria-label="Small" value={book.page} aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                </div>
                <div className="flex mb-4 w-full">
                    <div class="input-group input-group-sm mb-3 pr-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Thể loại</span>
                        </div>
                        <input type="text" class="form-control" value={book.category} onChange={(e) => { setBook({ ...book, 'category': e.target.value }) }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                    <div class="input-group input-group-sm mb-3 pl-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Giá</span>
                        </div>
                        <input type="number" class="form-control" value={book.bookPrice} onChange={(e) => { setBook({ ...book, 'bookPrice': e.target.value }) }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" required disabled={!checkCreate} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-6 w-1/2 content-center relative">
                <div className="justify-center flex mb-6">
                    <input type="file" disabled={!checkCreate} onChange={(e) => { handleImageChange(e) }} />
                </div>
                <div className="w-1/2 h-2/4 bg-white ml-auto mr-auto">
                    <img src={book.bookImage} alt="" className="img-rounded w-full h-full" />
                </div>
                <button className="btn btn-primary absolute bottom-2 right-2 !w-1/6" onClick={() => { handleCreate() }}>{
                    idBook === "0" ? 'Add' : (checkCreate ? "Save" : 'Edit')
                }</button>
            </div>
        </div>
    )
}
export default BookDetailADMIN