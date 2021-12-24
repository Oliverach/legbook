import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../Firebase.js"
import { useAuth } from "../context/AuthContext"

import FirebaseService from "../FirebaseService.js"


const ContentContext = React.createContext()

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({ children }) {

  const { getUsername } = FirebaseService()
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState([])
  const [usersPosts, setUsersPosts] = useState([])

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

  const fetchUsersPosts = async () => {
    setUsersPosts([])
    await firestore.collection("posts").where("user", "==", currentUser.uid).get().then(response => {
      response.docs.map(doc => {
        getUsername(doc.data().user).then(username => {
          setUsersPosts(usersPosts => [...usersPosts, { docId: doc.id, data: doc.data(), username: username }])
        })
      })
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  const value = {
    posts,
    usersPosts,
    fetchPosts,
    fetchUsersPosts
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}