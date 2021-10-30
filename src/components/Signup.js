import React, { useRef, useState } from 'react'
import useAuth from "../context/AuthContext"


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }
    return (
        <div className="container mx-auto flex h-screen justify-center items-center">
            <div className="card bordered w-1/2 h-1/2">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign Up</h2>
                    {error && alert(error)}
                    <form onSubmit={handleSubmit}>
                        <div className="form-control" id="email">
                            <label className="label">
                                <span className="label-text">E-Mail</span>
                            </label>
                            <input type="email" ref={emailRef} placeholder="E-Mail" className="input input-bordered" required />
                        </div>

                        <div className="form-control" id="password">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" ref={passwordRef} placeholder="Password" className="input input-bordered" required />
                        </div>

                        <div className="form-control" id="password-confirm">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" ref={passwordConfirmRef} placeholder="Confirm Password" className="input input-bordered" required />
                        </div>

                        <div  className="flex items-center justify-center my-5">
                            <button disabled={loading} type="submit" className="btn">Sign Up</button>
                        </div>
                    </form>
                    <h2 className="text-center">
                        Already have an account? Log In
                    </h2>
                </div>
            </div>
        </div>



    )
}
