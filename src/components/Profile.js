import React, { useEffect, useState,useRef} from "react"
import {firestore} from "firebase"
import { useAuth } from "../context/AuthContext"
import OpenedPost from "./OpenedPost"
import FirebaseService from "../FirebaseService"

export default function UserProfile() {
const {getUsername} = FirebaseService()
    const [posts, setPosts] = useState([])
    const { currentUser } = useAuth()
    const [openedPost, setOpenedPost] = useState()
    const modalRef = useRef()

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection("posts").where("user", "==", currentUser.uid).get().then(response => {
                response.docs.map(doc => {
                    getUsername(doc.data().user).then(username => {
                        setPosts(test => [...test, { docId: doc.id, data: doc.data(), username: username }])

                    })
                })
            })
        }
        fetchPosts()
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
                                <img className="hover: cursor-pointer" src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => { openPost(e, post) }}/>
                            </figure>
                            <div className="card-body flex justify-between">
                            <p className="break-words"><span className="font-semibold">{post.username}: </span>{post.data.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
