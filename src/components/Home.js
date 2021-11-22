import React, { useEffect, useState } from 'react'
import app from 'firebase';


export default function Dashboard() {

    const db = app.firestore()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const postsCollection = await db.collection("posts").get()

            setPosts(postsCollection.docs.map(doc => {

                return doc.data()
            }))
        }

        fetchPosts()
    }, [])


    return (
        <>
           
                {posts.map((post) => {
                    return (
                        <div class="card bordered">
                            <figure>
                                <img src={post.fileUrl} alt={post.description} />
                            </figure>
                            <div class="card-body">
                                <p>{post.description}</p>
                            </div>
                        </div>
                    )
                })}
            
        </>
    )
}
