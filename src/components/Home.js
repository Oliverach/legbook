import React, { useEffect, useState, useRef } from 'react'
import app from 'firebase';
import { useAuth } from "../context/AuthContext"


export default function Dashboard() {

    const [posts, setPosts] = useState([])
    const [openedPost, setOpenedPost] = useState()
    const modalRef = useRef()
    const { currentUser } = useAuth()

    useEffect(() => {
        const fetchPosts = async () => {
            const db = app.firestore()
            const postsCollection = await db.collection("posts").get()
            setPosts(postsCollection.docs.map(doc => {
                return { docId: doc.id, data: doc.data() }
            }))
        }
        fetchPosts()
    }, [])

    const commentPost = (comment, docId, uid) => {
        const id = app.firestore().collection('posts').doc().id
        app.firestore().collection('comments').doc(id).set({
            comment: comment,
            post: docId,
            user: uid
        }).then(function () {
            console.log("Comment successfully written!")
        }).catch(function (error) {
            console.error("Error commenting: ", error)
        })
    }

    return (
        <>
            <label htmlFor="openedPost" ref={modalRef}></label>
            <input type="checkbox" id="openedPost" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {openedPost && <img src={openedPost.data.fileUrl} className="mx-auto" style={{ objectFit: "cover" }} alt={openedPost.description} />}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Comment</span>
                        </label>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" >Comment</button>
                        <label htmlFor="openedPost" className="btn">Close</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                {posts.map((post) => {
                    return (

                        <div className="card w-1/4 mx-auto my-10 bordered cursor-pointer shadow-2xl" key={post.data.description} >
                            <figure>
                                <img src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => {
                                    e.preventDefault()
                                    setOpenedPost(post)
                                    modalRef.current.click()
                                }} />
                            </figure>
                            <div className="card-body">
                                <p>{post.data.description}</p>

                            </div>

                            <div className="form-control">

                                <div className="relative">
                                    <form  onSubmit={(e) => {
                                            e.preventDefault()
                                            commentPost(e.target.comment.value, post.docId, currentUser.uid)
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
