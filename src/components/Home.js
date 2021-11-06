import React from 'react'
import useAuth from '../context/AuthContext'

export default function Dashboard() {
    const { currentUser } = useAuth()

    return (
        <>
            {console.log(currentUser)}
            <div className="container mx-auto flex h-screen justify-center items-center">
                <div className="card bordered w-1/2 h-1/2">
                    <div className="card-body">
                        <h2 className="card-title text-center">{currentUser.email}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
