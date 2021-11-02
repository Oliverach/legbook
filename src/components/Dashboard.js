import React, {useState} from 'react'
import useAuth from '../context/AuthContext'
import { useHistory } from 'react-router'

export default function Dashboard() {

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleClick(){
        try{
                await logout
                history.push("/login")
        }catch{
                setError("Failed to logout")
        }

    }
    return (
        <>
            <div className="container mx-auto flex h-screen justify-center items-center">
                <div className="card bordered w-1/2 h-1/2">
                    <div className="card-body">
                    <h2 className="card-title text-center">Profile</h2>
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
                   
                    <strong>E-Mail:{currentUser.email} </strong> 
                    <button className="btn" onClick={handleClick}>Logout</button>
                    </div>
                </div>
            </div>

        </>
    )
}
