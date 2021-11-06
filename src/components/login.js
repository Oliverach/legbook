import React, { useRef, useState } from 'react'
import {useAuth} from "../context/AuthContext"
import { useHistory } from 'react-router-dom'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            
        }
        setLoading(false)
    }

    return (
        <>
            <div className="card shadow-lg bordered w-1/2 h-1/2">
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
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
        </>
    )
}
