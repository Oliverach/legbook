import React, {useEffect, useState} from 'react'
import app from 'firebase'
import { useAuth } from "../context/AuthContext"


export default function UserProfile({test}) {
 
    const [posts, setPosts] = useState([])
  const { currentUser } = useAuth()
    useEffect(()=>{
        
        const fetchUsers = async () =>{
            const db = app.firestore()
            const postRef = db.collection("posts");
            const collecion = await postRef.where('user', '==', currentUser.uid).get()
            setPosts(collecion.docs.map(doc => {
                return doc.data()
            }))
        }
        fetchUsers()

        console.log(test)
    },[])

    return (
        <>
        <h1 className="text-3xl font-semibold text-center my-5">Your Posts</h1>
            <div className="flex flex-col">
                {posts.map((post) => {
                    return (
                        <div className="card w-1/4 mx-auto my-10 bordered  shadow-2xl" key={post.description}>
                            <figure>
                                <img src={post.fileUrl} style={{ objectFit: "cover" }} alt={post.description} />
                            </figure>
                            <div className="card-body">
                                <p>{post.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
