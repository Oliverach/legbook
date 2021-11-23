import React, { useEffect, useState } from 'react'
import app from 'firebase';


export default function Dashboard({test}) {

  console.log(test)

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
