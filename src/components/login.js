import React, { useRef, useState } from 'react'
import useAuth from "../context/AuthContext"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to login")
        }
        setLoading(false)
    }
    return (
        <div className="container mx-auto flex h-screen justify-center items-center">
            <div className="card bordered w-1/2 h-1/2">
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
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
                        <div className="flex items-center justify-center my-5">
                            <button disabled={loading} type="submit" className="btn">Login</button>
                        </div>
                    </form>
                    <h2 className="text-center">
                        Need an account? <a href="/signup">Sign Up</a>
                    </h2>
                </div>
            </div>
        </div>
    )
}
