import React, { useRef, useEffect, useState } from 'react'
import app from 'firebase';
import { useAuth } from "../context/AuthContext"

export default function NewPost() {
    const fileInputRef = useRef()
    const descriptionRef = useRef()
    const closeRef = useRef()
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    const { currentUser } = useAuth()

    const uploadImage = async (e) => {
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(image.name)
        await fileRef.put(image)
        await fileRef.getDownloadURL().then(function (response) {
            console.log(response)
            const id = app.firestore().collection('posts').doc().id
            app.firestore().collection('posts').doc(id).set({
                description: descriptionRef.current.value,
                fileUrl: response,
                user: currentUser.uid
            }).then(function () {
                console.log("Document successfully written!");
                alert("aight bro u do u")
                  setImage(null)
                  descriptionRef.current.value= ""
                  closeRef.current.click()

            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        })
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image])
    return (
        <>
            <label htmlFor="my-modal-2" className="btn btn-ghost modal-button">New Post</label>
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="flex justify-center items-center">
                        {preview ? (
                            <img
                                src={preview}
                                style={{ objectFit: "cover" }}
                                alt="preview"
                            />) : (<>

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
                                            const file = event.target.files[0];
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
                        <textarea className="textarea h-24 textarea-bordered textarea-primary" ref={descriptionRef} name="description" placeholder="Description"></textarea>
                    </div>
                    <div className="modal-action">
                        <button htmlFor="my-modal-2" className="btn btn-primary" onClick={e => {
                            e.preventDefault()
                            if (image) {
                                uploadImage(e)
                            }
                        }}>Submit</button>
                        <label htmlFor="my-modal-2" ref={closeRef} className="btn">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}
