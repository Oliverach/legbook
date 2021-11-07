import React, { useRef, useEffect, useState } from 'react'

export default function NewPost() {

    const fileInputRef = useRef()

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();


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
                    {preview ? (
                        <img
                            src={preview}
                            style={{ objectFit: "cover" }}
                        />) : (<>
                            <button class="btn btn-primary mx-auto" onClick={e => {
                                e.preventDefault()
                                fileInputRef.current.click()
                            }}>Select Image</button>
                            <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && file.type.substr(0, 5) === "image") {
                                        setImage(file);
                                    } else {
                                        setImage(null);
                                    }
                                }}
                            />
                        </>)}
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea class="textarea h-24 textarea-bordered textarea-primary" placeholder="Description"></textarea>
                    </div>
                    <div class="modal-action">
                        <label for="my-modal-2" class="btn btn-primary">Accept</label>
                        <label for="my-modal-2" class="btn">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}
