import React, { useEffect, useState, useRef} from "react"
import { fetchComments } from "../FirebaseService"

export default function OpenedPost({openedPost, modalRef}) {

    const [comments, setComments] = useState([])
    useEffect(() => {
        if (openedPost) {
            fetchComments(openedPost.docId).then((data) => {
                setComments(data)
            })
           
        }
    }, [openedPost])

    return (<>
        <label htmlFor="openedPost" ref={modalRef}></label>
        <input type="checkbox" id="openedPost" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                {openedPost && <img src={openedPost.data.fileUrl} className="mx-auto" style={{ objectFit: "cover" }} alt={openedPost.data.description} />}
                <div className="collapse rounded-2xl mx-auto mt-2 collapse-arrow  ">
                    <input type="checkbox" />
                    <h5 className="collapse-title font-bold">
                        View comments
                    </h5>
                    <div className="collapse-content">
                        {comments.length ? (
                            comments.map((comment) => {
                                return <p key={comment.id}>fix this:{comment.comment}</p>
                            })) : (<h6>No comments yet</h6>)}
                    </div>
                </div>
                <div className="modal-action">
                    <label htmlFor="openedPost" className="btn">Close</label>
                </div>
            </div>
        </div>
    </>
    )
}
