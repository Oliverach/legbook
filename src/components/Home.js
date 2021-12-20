import React, { useEffect, useState, useRef } from "react"
import { firestore } from "firebase"
import { useAuth } from "../context/AuthContext"
import Swal from "sweetalert2"
import OpenedPost from "./OpenedPost"
import FirebaseService from "../FirebaseService"

export default function Dashboard() {
    const modalRef = useRef()
    const [posts, setPosts] = useState([])
    const [openedPost, setOpenedPost] = useState()
    const { currentUser } = useAuth()
    const { getUsername } = FirebaseService()

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection("posts").get().then(response => {
                response.docs.map(doc => {
                    getUsername(doc.data().user).then(username => {
                        setPosts(posts => [...posts, { docId: doc.id, data: doc.data(), username: username }])

                    })
                })
            })
        }
        fetchPosts()
    }, [])

    const commentPost = (comment, docId, uid) => {
        if (!comment) {
            Swal.fire({
                icon: 'error',
                title: 'Comment is empty!',
                text: '',
            })
            return
        }
        const id = firestore().collection("posts").doc().id
        firestore().collection("comments").doc(id).set({
            comment: comment,
            post: docId,
            user: uid
        }).then(function () {
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
            <OpenedPost openedPost={openedPost} modalRef={modalRef} />
            {posts && (<div className="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div className="card w-1/3 mx-auto my-10 cursor-pointer shadow-2xl" key={post.docId} >
                            <figure>
                                <label htmlFor="openedPost">
                                    <img src={post.data.fileUrl} style={{ objectFit: "cover" }} className="hover: cursor-pointer" alt={post.data.description} onClick={(e) => { openPost(e, post) }} />
                                </label>
                            </figure>
                            <div className="card-body">
                                <p className="break-words"><span className="font-semibold">{post.username}: </span>{post.data.description}</p>
                            </div>
                            <div className="form-control">
                                <div className="relative">
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        commentPost(e.target.comment.value, post.docId, currentUser.uid)
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
