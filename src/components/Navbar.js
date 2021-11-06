import React from 'react'
import useAuth from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


export default function Navbar() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout(e) {
        e.preventDefault()
        try {
            await logout
            history.push("/login")
        } catch {
            console.log("failed to logout")
        }
    }

    const navbarElementWhenLoggedOut = (
        <>
            <div className="flex-none hidden px-2 mx-2 lg:flex">
                <div className="flex items-stretch">
                    <a className="btn btn-ghost btn-sm rounded-btn" href="/login">
                        Login
                    </a>
                </div>
            </div>
            <div className="flex-none hidden px-2 mx-2 lg:flex">
                <div className="flex items-stretch">
                    <a className="btn btn-ghost btn-sm rounded-btn" href="/signup">
                        Signup
                    </a>
                </div>
            </div>
        </>)

    const navbarElementWhenLoggedIn = (
        <div>
            <div className="flex-none hidden px-2 mx-2 lg:flex">
                <div className="flex items-stretch">
                    <div className="btn btn-ghost btn-sm rounded-btn" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )

    const navbar = (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
            <div className="flex-1 px-2 mx-2">
                <span className="text-lg font-bold">
                    Legbook
                </span>
            </div>
            {currentUser? navbarElementWhenLoggedOut : navbarElementWhenLoggedIn}
        </div>)

    return navbar
}