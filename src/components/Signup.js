import React, { useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    const [loading, setLoading] = useState(false)
    const [buttonType, setButtonType] = useState("btn")
    const history = useHistory()
    const swal = withReactContent(Swal)

    async function handleSubmit(e) {
        e.preventDefault()
        if(usernameRef.current.value.trim() === ""){
            return swal.fire({
                icon: "error",
                title: "",
                text: "Username required"
            })
            
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return swal.fire({
                icon: "error",
                title: "",
                text: "Passwords do not match"
            })
        }
        try {
            setLoading(true)
            setButtonType("btn loading")
            await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
            history.push("/login")
        } catch {
            swal.fire({
                icon: "error",
                title: "",
                text: "Something went wrong!"
            })
        }
        setButtonType("btn")
        setLoading(false)
    }
    return (
        <>
         <h1 className="text-3xl font-semibold text-center my-5">Legbook</h1>
            <div className="card mx-auto bordered w-1/2">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-control" id="username">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" ref={usernameRef} placeholder="Username" className="input input-primary input-bordered" required />
                        </div>

                        <div className="form-control" id="email">
                            <label className="label">
                                <span className="label-text">E-Mail</span>
                            </label>
                            <input type="email" ref={emailRef} placeholder="E-Mail" className="input input-primary input-bordered" required />
                        </div>

                        <div className="form-control" id="password">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" ref={passwordRef} placeholder="Password" className="input input-primary input-bordered" required />
                        </div>

                        <div className="form-control" id="password-confirm">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" ref={passwordConfirmRef} placeholder="Confirm Password" className="input input-primary input-bordered" required />
                        </div>

                        <div className="flex items-center justify-center my-5">
                            <button disabled={loading} type="submit" className={buttonType}>Sign Up</button>
                        </div>
                    </form>
                    <h2 className="text-center">
                        Already have an account? <a href="/login" className="hover:underline">Login</a>
                    </h2>
            
                </div>
            </div>
        </>
    )
}
