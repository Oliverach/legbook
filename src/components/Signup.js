import React, { useRef, useState } from 'react'
import useAuth from "../context/AuthContext"
import { useHistory } from 'react-router'


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [buttonType, setButtonType] = useState("btn")
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            setButtonType("btn loading")
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        } catch {
            setError("Failed to create an account")
        }
        setButtonType("btn")
        setLoading(false)
    }
    return (
        <>
            
  
            <div className="card bordered w-1/2">
                <div className="card-body">
                    <h2 className="card-title text-center">Sign Up</h2>
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

                        <div className="form-control" id="password-confirm">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" ref={passwordConfirmRef} placeholder="Confirm Password" className="input input-bordered" required />
                        </div>

                        <div className="flex items-center justify-center my-5">
                            <button disabled={loading} type="submit" className={buttonType}>Sign Up</button>
                        </div>
                    </form>
                    <h2 className="text-center">
                        Already have an account? <a href="/login">Login</a>
                    </h2>
                </div>
            </div>
      
            </>


    )
}
