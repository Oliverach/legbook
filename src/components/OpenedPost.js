import React, { useEffect, useRef } from "react"
import FirebaseService from "../FirebaseService"

export default function OpenedPost({ openedPost, modalRef }) {

    const { fetchComments, comments } = FirebaseService()
    const colapseRef = useRef()

    useEffect(() => {
        if (openedPost) {
            fetchComments(openedPost.docId)
        }
    }, [openedPost])

    return (<>
        <label htmlFor="openedPost" ref={modalRef}></label>
        <input type="checkbox" id="openedPost" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                {openedPost && <img src={openedPost.data.fileUrl} className="mx-auto" style={{ objectFit: "cover" }} alt={openedPost.data.description} />}
                <div className="collapse rounded-2xl mx-auto mt-2 collapse-arrow ">
                    <input type="checkbox" ref={colapseRef} />
                    <h5 className="collapse-title font-bold">
                        View comments
                    </h5>
                    <div className="collapse-content">
                        {comments.length ? (
                            comments.map((comment) => {
                                return <p className="break-words" key={comment.id}><span className="font-semibold">{comment.username}: </span>{comment.comment}</p>
                            })) : (<h6>No comments yet</h6>)}
                    </div>
                </div>
                <div className="modal-action">
                    <label htmlFor="openedPost" className="btn" onClick={() => {
                        if (colapseRef.current.checked) {
                            colapseRef.current.click()
                        }
                    }}>Close</label>
                </div>
            </div>
        </div>
    </>
    )
}
