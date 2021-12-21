import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../Firebase.js"

import FirebaseService from "../FirebaseService.js"


const ContentContext = React.createContext()

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({ children }) {
  
  const { getUsername } = FirebaseService()
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    setPosts([])
    await firestore.collection("posts").get().then(response => {
      response.docs.map(doc => {
        getUsername(doc.data().user).then(username => {
          setPosts(posts => [...posts, { docId: doc.id, data: doc.data(), username: username }])
        })
      })
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  

  const value = {
    posts,
     fetchPosts
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}