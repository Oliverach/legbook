import React, {useEffect, useState} from 'react'
import app from 'firebase'
import { useAuth } from "../context/AuthContext"

export default function UserProfile() {
    const { currentUser } = useAuth()
    const [posts, setPosts] = useState([])
    const db = app.firestore()
    useEffect(()=>{
        const fetchUsers = async () =>{
            const postRef = db.collection("posts");
            const collecion = await postRef.where('user', '==', currentUser.uid).get()
            setPosts(collecion.docs.map(doc => {
                return doc.data()
            }))
        }
        fetchUsers()
    },[])
    return (
        <>
            <div class="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div class="card w-1/4 mx-auto my-10 bordered  shadow-2xl">
                            <figure>
                                <img src={post.fileUrl} style={{ objectFit: "cover" }} alt={post.description} />
                            </figure>
                            <div class="card-body">
                                <p>{post.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
