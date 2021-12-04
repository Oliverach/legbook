import React, { useEffect, useState } from 'react'
import app from 'firebase';


export default function Dashboard() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const db = app.firestore()
            const postsCollection = await db.collection("posts").get()
            setPosts(postsCollection.docs.map(doc => {
                console.log(doc.data())
                return doc.data()
            }))
        }
        fetchPosts()
    }, [])


    const commentPost = (comment, fileUrl) => {
        // const id = app.firestore().collection('posts').doc().id
        // app.firestore().collection('comments').doc(id).set({
        //     comment: comment,
        //     post
        // }).then(function () {
        //     console.log("Document successfully written!")
          
        // }).catch(function (error) {
        //     console.error("Error writing document: ", error)
        // })
    }

    return (

        <div className="flex flex-col">
            {posts.map((post) => {
                return (

                    <>
                        <div className="card w-1/4 mx-auto my-10 bordered  shadow-2xl" key={post.description}>
                            <figure>
                                <img src={post.fileUrl} style={{ objectFit: "cover" }} alt={post.description} />
                            </figure>
                            <div className="card-body">
                                <p>{post.description}</p>
                            </div>
                            <form onSubmit={e => {
                                            e.preventDefault()
                                            commentPost(e.target.comment.value, post.fileUrl)
                                        }}>
                                <div class="form-control">
                                    <div class="relative">
                                        <input type="text" name="comment" placeholder="Leave a comment" class="w-full pr-16 focus-outline-none input input-bordered rounded-t-none rounded-b-2xl" />
                                        <button  type="submit" class="absolute top-0 right-0 rounded-l-none btn rounded-t-none rounded-b-2xl">
                                            <span class="material-icons">
                                                comment
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </>

                )
            })}
        </div>

    )
}
