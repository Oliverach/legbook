import React, { useRef, useEffect, useState } from "react"
import { storage, firestore } from "../Firebase.js"
import { useAuth } from "../context/AuthContext"
import { useContent } from "../context/ContentContext"
import Swal from "sweetalert2"

export default function NewPost() {
    const {fetchPosts, fetchUsersPosts} = useContent()
    const fileInputRef = useRef()
    const descriptionRef = useRef()
    const closeRef = useRef()
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()

    const handleSubmit = async () => {
        setLoading(true)
        const storageRef = storage.ref()
        const fileRef = storageRef.child(image.name)
        await fileRef.put(image)
        await fileRef.getDownloadURL().then(function (response) {
            const id = firestore.collection("posts").doc().id
            firestore.collection("posts").doc(id).set({
                description: descriptionRef.current.value,
                fileUrl: response,
                user: currentUser.uid
            }).then(function () {
                fetchPosts()
                fetchUsersPosts()
                closeRef.current.click()
                Swal.fire(
                    "Posted!",
                    "",
                    "success"
                )
            }).catch(function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                  })
            })
        })
        setLoading(false)
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
    }, [image])

    return (
        <>
            <label htmlFor="my-modal-2" className="btn btn-ghost rounded-btn ">NEW POST</label>
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-h-screen">
                    <div className="flex justify-center items-center">
                        {preview ? (
                            <div className="h-3/4">
                                <img
                                    src={preview}
                                    style={{ objectFit: "cover" }}
                                    className="max-h-72 rounded"
                                    alt="preview"
                                /></div>) : (<>

                                    <button className="btn btn-primary mx-auto " onClick={e => {
                                        e.preventDefault()
                                        fileInputRef.current.click()
                                    }}>Select Image</button>
                                    <form>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            accept="image/*, video/*"
                                            onChange={(event) => {
                                                const file = event.target.files[0]
                                                if (file && file.type.substr(0, 5) === "image") {
                                                    setImage(file)

                                                } else {
                                                    setImage(null)
                                                }
                                            }}
                                        />
                                    </form>
                                </>)}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea className="textarea h-24 max-h-80 textarea-bordered textarea-primary"  ref={descriptionRef} name="description" placeholder="Description"></textarea>
                    </div>
                    <div className="modal-action">
                        {loading ? (<><button htmlFor="my-modal-2" className="btn btn-primary loading" disabled="disabled" onClick={e => {
                            e.preventDefault()
                            if (image) {
                                handleSubmit(e)
                            }
                        }}>Submit</button>
                            <label htmlFor="my-modal-2" ref={closeRef} className="btn " disabled="disabled">Close</label></>)
                            : (<><button htmlFor="my-modal-2" className="btn btn-primary" onClick={e => {
                                e.preventDefault()
                                if (!descriptionRef.current.value) {
                                    alert("description required")
                                } else {
                                    if (image) {
                                        handleSubmit(e)
                                    } else {
                                        alert("Image required")
                                    }
                                }

                            }}>Submit</button>
                                <label htmlFor="my-modal-2" ref={closeRef} onClick={() => {
                                    setImage(null)
                                    descriptionRef.current.value = null
                                }} className="btn">Close</label></>)}
                    </div>
                </div>
            </div>
        </>
    )
}
