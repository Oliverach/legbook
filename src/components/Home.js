import React, { useEffect, useState, useRef } from 'react'
import app from 'firebase'
import { useAuth } from "../context/AuthContext"
import Swal from 'sweetalert2'

import OpenedPost from './OpenedPost'

export default function Dashboard() {
    const modalRef = useRef()
    const [posts, setPosts] = useState([])
    const [openedPost, setOpenedPost] = useState()
    const { currentUser } = useAuth()
    const db = app.firestore()

    useEffect(() => {
        const fetchPosts = async () => {
            const postsCollection = await db.collection("posts").get()
            setPosts(postsCollection.docs.map(doc => {
                return { docId: doc.id, data: doc.data(), username: "fix this" }
            }))
        }
        fetchPosts()
    }, [])


    const commentPost = (comment, docId, uid) => {
        if(!comment){
            alert("Comment empty")
            return
        }
        const db = app.firestore()
        const id = db.collection('posts').doc().id
        db.collection('comments').doc(id).set({
            comment: comment,
            post: docId,
            user: uid
        }).then(function () {
            Swal.fire(
                'Commented!',
                '',
                'success'
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
        
            <OpenedPost openedPost={openedPost} modalRef={modalRef}/>
            <div className="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div className="card w-1/3 mx-auto my-10 cursor-pointer shadow-2xl" key={post.docId} >
                            <figure>
                                <label htmlFor="openedPost">
                                    <img src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => { openPost(e, post) }} />
                                </label>
                            </figure>
                            <div className="card-body">

                                <p>{post.username + ": " + post.data.description}</p>

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
            </div>
        </>
    )
}
