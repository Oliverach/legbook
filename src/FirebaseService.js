import app from 'firebase'


const db = app.firestore()

export const getUsername = async (uid) => {
    const doc = await db.collection("users").doc(uid).get()
    return doc.data().username
}

export const fetchComments = async (postId) => {
    var comments = []
    const commentCollection = await db.collection('comments').where('post', '==', postId).get()
    comments = commentCollection.docs.map(doc => {
        return { comment: doc.data().comment, username: "fix this", id: doc.id }
    })
  
    return comments
}


