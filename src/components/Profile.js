import React, { useEffect, useState, useRef } from "react"
import { storage, firestore } from "../Firebase.js"
import { useContent } from "../context/ContentContext.js"
import OpenedPost from "./OpenedPost"

import Swal from "sweetalert2"

export default function UserProfile() {

    const { usersPosts, fetchUsersPosts } = useContent()
    const [openedPost, setOpenedPost] = useState()
    const modalRef = useRef()

    useEffect(() => {
        fetchUsersPosts()
    }, [])

    const handleDelete = async (docId, img) => {
        await firestore.collection("posts").doc(docId).delete().then(() => {
            const fileRef = storage.refFromURL(img)
            fileRef.delete().then(() => {
                fetchUsersPosts()
                Swal.fire(
                    "Post deleted!",
                    "",
                    "success"
                )

            }).catch((error) => {
                console.error(error)
                Swal.fire({
                    icon: "error",
                    title: "",
                    text: "error"
                })
            })
        }).catch((error) => {
            console.error(error)
            Swal.fire({
                icon: "error",
                title: "",
                text: "error"
            })
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
           {usersPosts.length?( <h1 className="text-3xl font-semibold text-center my-5">Your Posts</h1>):(<h1 className="text-3xl font-semibold text-center my-5">No Posts yet</h1>)}
            <div className="flex flex-col">
                {usersPosts.map((post) => {
                    return (
                        <div className="card w-1/3 mx-auto my-10 cursor-pointer shadow-2xl" key={post.docId}>
                            <figure>
                                <img className="hover: cursor-pointer" src={post.data.fileUrl} style={{ objectFit: "cover" }} alt={post.data.description} onClick={(e) => { openPost(e, post) }} />
                            </figure>


                            <div className="card-body flex justify-between">


                                <p className="break-words"><span className="font-semibold">{post.username}: </span>{post.data.description}</p>
                            </div>
                            <ul className="menu shadow-lg bg-base-100 horizontal">
                                <li className="w-1/2">
                                    <a className="w-full" onClick={() => { handleDelete(post.docId, post.data.fileUrl) }}>
                                        <span className="material-icons-outlined mx-auto">
                                            delete
                                        </span>
                                    </a>
                                </li>
                                <li className="w-1/2">
                                    <a className="w-full">
                                        <span className="material-icons-outlined mx-auto">
                                            edit
                                        </span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
