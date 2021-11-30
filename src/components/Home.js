import React, { useEffect, useState } from 'react'
import app from 'firebase';


export default function Dashboard() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const db = app.firestore()
            const postsCollection = await db.collection("posts").get()
            setPosts(postsCollection.docs.map(doc => {
                return doc.data()
            }))
        }
        fetchPosts()
    }, [])


    return (
        <>
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
