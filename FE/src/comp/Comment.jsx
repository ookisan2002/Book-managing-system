

const Comment = ({ cmt }) => {

    return (
        <div className="w-full border-b-2 border-black flex flex-col items-start p-4">
            <h3 className="mb-1">{cmt.ownerEmail}</h3>
            <div className="flex mb-1">
                <i for="star5" className={`star text-2xl ${(cmt.star>=1) ? "text-amber-400" :"text-slate-600"}` }>&#9733;</i>
                <i for="star5" className={`star text-2xl ${cmt.star>=2 ?"text-amber-400" :"text-slate-600"}`}>&#9733;</i>
                <i for="star5" className={`star text-2xl ${cmt.star>=3 ?"text-amber-400" :"text-slate-600"}`}>&#9733;</i>
                <i for="star5" className={`star text-2xl ${cmt.star>=4 ?"text-amber-400" :"text-slate-600"}`}>&#9733;</i>
                <i for="star5" className={`star text-2xl ${cmt.star>=5 ?"text-amber-400" :"text-slate-600"}`}>&#9733;</i>
            </div>
            <p>{cmt.content}</p>
        </div>
    )
}
export default Comment