import React, { useEffect, useState,useRef} from 'react'
import app from 'firebase'
import { useAuth } from "../context/AuthContext"
import OpenedPost from './OpenedPost'

export default function UserProfile() {

    const [posts, setPosts] = useState([])
    const { currentUser } = useAuth()
    const [openedPost, setOpenedPost] = useState()
    const modalRef = useRef()
    const db = app.firestore()

    useEffect(() => {

        const fetchUsers = async () => {
            const collecion = await db.collection("posts").where('user', '==', currentUser.uid).get()
            setPosts(collecion.docs.map(doc => {
                return { docId: doc.id, data: doc.data(), username: "fix this" }
            }))
        }
        fetchUsers()
    }, [])


    const openPost = (e, post) => {
        e.preventDefault()
        setOpenedPost(post)
        modalRef.current.click()
    }

    return (
        <>
            <OpenedPost openedPost={openedPost} modalRef={modalRef}/>
            <h1 className="text-3xl font-semibold text-center my-5">Your Posts</h1>
            <div className="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div className="card w-1/4 mx-auto my-10 bordered shadow-2xl" key={post.docId}>
                            <figure>
                                <img src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => { openPost(e, post) }}/>
                            </figure>
                            <div className="card-body">
                                <p>{post.data.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
