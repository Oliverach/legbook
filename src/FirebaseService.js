import { useState, useEffect} from "react"
import app from "firebase"

export default function FirebaseService() {

    const [comments, setComments] = useState([])
    const db = app.firestore()

    const getUsername = async (uid) => {
        const doc = await db.collection("users").doc(uid).get()
        return doc.data().username
    }

    const fetchComments = async (postId) => {
        setComments([])
        await db.collection("comments").where("post", "==", postId).get().then(response => {
            response.docs.map(doc => {
                getUsername(doc.data().user).then((username) => {
                    setComments(comments => [...comments, { comment: doc.data().comment, username: username, id: doc.id }])
                })
            })
        })
    }


    useEffect(() => {
        console.log(comments)
    }, [comments])

    
    const value = {
        getUsername,
        fetchComments,
        comments,
        db
    }
    return value
}
