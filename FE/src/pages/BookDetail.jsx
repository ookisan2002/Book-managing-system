import { useParams } from "react-router-dom";
import DetailsHeader from "../comp/DetailsHeader";
import { useEffect, useState } from "react";

const BookDetail = ()=>{
    const {id:idBook}=useParams();
    const [book,setBook]= useState({});
    useEffect(() => {
        fetch(`http://localhost:8080/book/${idBook}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setBook(data);
                
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="flex flex-col">
            <DetailsHeader
                book = {book}
            />
        </div>
    )
}
export default BookDetail