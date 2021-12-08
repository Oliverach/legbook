import React, { useEffect, useState, useRef } from 'react'
import app from 'firebase'
import { useAuth } from "../context/AuthContext"


export default function Dashboard() {
    const [comments, SetComments] = useState([])
    const [posts, setPosts] = useState([])
    const [openedPost, setOpenedPost] = useState()
    const modalRef = useRef()
    const { currentUser } = useAuth()
    const db = app.firestore()



    useEffect(() => {

        const getUsername = async (uid) => {
            const doc = await db.collection("users").doc(uid).get()
            return doc.data().username
        }

        const fetchPosts = async () => {
            const postsCollection = await db.collection("posts").get()
            setPosts(postsCollection.docs.map(doc => {
                return { docId: doc.id, data: doc.data(), username: "fix this" }
            }))

        }
        fetchPosts()
    }, [])

    const commentPost = (comment, docId, uid) => {
        const id = db.collection('posts').doc().id
        db.collection('comments').doc(id).set({
            comment: comment,
            post: docId,
            user: uid
        }).then(function () {
            console.log("Comment successfully written!")
        }).catch(function (error) {
            console.error("Error commenting: ", error)
        })
    }

    const fetchComments = async (postId) =>{
        const commentCollection = await db.collection('comments').where('post', '==', postId).get()
        SetComments(commentCollection.docs.map(doc => {
            return { comment: doc.data().comment, username: "fix this" }
        }))
        
    }

    return (
        <>
            <label htmlFor="openedPost" ref={modalRef}></label>
            <input type="checkbox" id="openedPost" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {openedPost && <img src={openedPost.data.fileUrl} className="mx-auto" style={{ objectFit: "cover" }} alt={openedPost.description} />}

                    <div class="collapse mx-auto border rounded-box border-base-300 collapse-arrow">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            View all comment
                        </div>
                        <div class="collapse-content">
                            {comments.map((comment)=>{
                             return(   <p>{comment.comment}</p>)
                            })}
                        </div>
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

                        <div className="card w-1/4 mx-auto my-10 cursor-pointer shadow-2xl" key={post.data.description} >
                            <figure>
                                <img src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => {
                                    e.preventDefault()
                                    fetchComments(post.docId)
                                    setOpenedPost(post)
                                    modalRef.current.click()
                                }} />
                            </figure>
                            <div className="card-body">

                                <p>{post.username + ": " + post.data.description}</p>

                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <form onSubmit={(e) => {
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
