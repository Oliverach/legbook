import React, { useRef, useState} from 'react'
import useAuth from "../context/AuthContext"
import { useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
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
                    {error && (
                        <div class="alert alert-error">
                            <div class="flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}
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
