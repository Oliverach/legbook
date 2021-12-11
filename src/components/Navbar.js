import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { themeChange } from 'theme-change'
import NewPost from './NewPost'

export default function Navbar() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    useEffect(() => {
        themeChange(false)
    }, [])

    async function handleLogout(e) {
        e.preventDefault()
        try {
            await logout()
            history.push("/login")
        } catch {
            console.log("failed to logout")
        }
    }

    const navbarElementWhenLoggedOut = (
        <>

            <div className="flex-none hidden px-2 mx-2 lg:flex">
                <div className="flex items-stretch">
                    <a className="btn btn-ghost rounded-btn" href="/login">
                        Login
                    </a>
                </div>
            </div>
            <div className="flex-none hidden px-2 mx-2 lg:flex">
                <div className="flex items-stretch">
                    <a className="btn btn-ghost rounded-btn" href="/signup">
                        Signup
                    </a>
                </div>
            </div>
        </>)

    const navbarElementWhenLoggedIn = (
        <>

            <div className="hidden md:flex items-center space-x-1">
                <NewPost />
                <div className="flex-none hidden px-2 mx-2 lg:flex">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href="/">
                            Home
                        </a>
                    </div>
                </div>
                <div className="flex-none hidden px-2 mx-2 lg:flex">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href="/profile">
                            Profile
                        </a>
                    </div>
                </div>
                <div className="flex-none hidden px-2 mx-2 lg:flex">
                    <div className="flex items-stretch">
                        <div className="btn btn-ghost rounded-btn" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="hidden mobile-menu">
                <ul class="">
                    <li><a href="/" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                    <li><a href="/profile" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Profile</a></li>
                    <li><div onClick={handleLogout} class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Logout</div></li>
                </ul>
            </div> */}
        </>
    )

    const temp = (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">


                        <div className="hidden md:flex items-center space-x-1">
                            <a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Services</a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
                            <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={() => {
                            const menu = document.querySelector(".mobile-menu");
                            menu.classList.toggle("hidden")
                        }}>
                            <span className="material-icons">
                                menu
                            </span>

                        </button>
                    </div>
                </div>
            </div>

            <div class="hidden mobile-menu">
                <ul class="">
                    <li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                    <li><a href="#services" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
                    <li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
                    <li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
                </ul>
            </div>

        </nav>
    )

    const navbar = (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
            <div className="flex-1 px-2 mx-2">
                <span className="text-lg font-bold">
                    <a href="/"> Legbook</a>
                </span>
            </div>
            
            {/* <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button" onClick={() => {
                    const menu = document.querySelector(".mobile-menu");
                    menu.classList.toggle("hidden")
                }}>
                    <span class="material-icons">
                        menu
                    </span>

                </button>
            </div> */}
            {currentUser ? navbarElementWhenLoggedIn : navbarElementWhenLoggedOut}

            {/* <input type="checkbox" className="toggle" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"></input> */}
        </div>)

    return navbar
}
