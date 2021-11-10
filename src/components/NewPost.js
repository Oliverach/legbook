import React, { useRef, useEffect, useState } from 'react'
import app from 'firebase';

export default function NewPost() {

    const fileInputRef = useRef()

    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    const [description, setDescription] = useState()
    const [fileUrl, setFileUrl] = useState()

    const uploadImage = async (e) => {
        console.log("saasfdfasdfdasf")
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(image.name)
        await fileRef.put(image)
        setFileUrl(await fileRef.getDownloadURL())
        const description = "test";
    
        await app.firestore().collection("posts").doc(description).set({
            description: description,
            fileUrl : fileUrl
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
    }, [image]);
    return (
        <>
            <label for="my-modal-2" class="btn btn-ghost modal-button">New Post</label>
            <input type="checkbox" id="my-modal-2" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <div className="flex justify-center items-center">
                        {preview ? (
                            <img
                                src={preview}
                                style={{ objectFit: "cover" }}
                                alt="preview"
                            />) : (<>

                                <button class="btn btn-primary mx-auto " onClick={e => {
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
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea class="textarea h-24 textarea-bordered textarea-primary" name="description" placeholder="Description"></textarea>
                    </div>
                    <div class="modal-action">
                        <button for="my-modal-2" class="btn btn-primary"  onClick={e => {
                                    e.preventDefault()
                                    if(image){
                                        uploadImage(e)
                                    }
                                }}>Submit</button>
                        <label for="my-modal-2" class="btn">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}
