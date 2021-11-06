import React from 'react'

export default function NewPost() {
    return (
        <>
            <label for="my-modal-2" class="btn btn-ghost modal-button">New Post</label>
            <input type="checkbox" id="my-modal-2" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">

                    <input type="file" />
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
