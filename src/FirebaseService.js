import { useState, useEffect} from "react"
import {firestore} from "firebase"

export default function FirebaseService() {

    const [comments, setComments] = useState([])

    const getUsername = async (uid) => {
        const doc = await firestore().collection("users").doc(uid).get()
        return doc.data().username
    }

    const fetchComments = async (postId) => {
        setComments([])
        await  firestore().collection("comments").where("post", "==", postId).get().then(response => {
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
        comments
    }
    return value
}
