import React, { useState, useRef } from "react"
import { firestore } from "../Firebase.js"
import { useAuth } from "../context/AuthContext"
import Swal from "sweetalert2"
import OpenedPost from "./OpenedPost.js"
import { useContent } from "../context/ContentContext.js"

export default function Dashboard() {
    const modalRef = useRef()
    const [openedPost, setOpenedPost] = useState()
    const { currentUser } = useAuth()
    const { posts } = useContent()
    const updateCommentRef = useRef()

    const handleSubmit = (comment, docId, uid) => {
        if (!comment) {
            return Swal.fire({
                icon: 'error',
                title: 'Comment is empty!',
                text: '',
            })

        }
        const id = firestore.collection("comments").doc().id
        firestore.collection("comments").doc(id).set({
            comment: comment,
            post: docId,
            user: uid
        }).then(function () {
            if (openedPost && docId === openedPost.docId) {
                updateCommentRef.current.triggerEvent(openedPost.docId)
            }
            Swal.fire(
                "Commented!",
                "",
                "success"
            )
        }).catch(function (error) {
            console.error("Error commenting: ", error)
        })
    }

    const openPost = (e, post) => {
        e.preventDefault()
        setOpenedPost(post)
        modalRef.current.click()
    }


    return (
        <>
            <OpenedPost openedPost={openedPost} modalRef={modalRef} updateCommentRef={updateCommentRef}/>
            {posts && (<div className="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div className="card w-1/3 mx-auto my-10 cursor-pointer shadow-2xl" key={post.docId} >
                            <figure>
                                <img src={post.data.fileUrl} style={{ objectFit: "cover" }} className="hover: cursor-pointer" alt={post.data.description} onClick={(e) => { openPost(e, post) }} />
                            </figure>
                            <div className="card-body">
                                <p className="break-words"><span className="font-semibold">{post.username}: </span>{post.data.description}</p>
                            </div>
                            <div className="form-control">
                                <div className="relative">
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSubmit(e.target.comment.value, post.docId, currentUser.uid)
                                        e.target.comment.value = ""
                                    }}>
                                        <input type="text" placeholder="Leave a comment" name="comment" className="w-full pr-16 rounded-t-none rounded-b-2xl input input-bordered" />
                                        <button type="submit" className="absolute top-0 right-0 rounded-l-none btn rounded-t-none rounded-b-2xl">
                                            <span className="material-icons-outlined">
                                                comment
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>)}
        </>
    )
}
