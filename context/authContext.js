'use client'

import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useState, useContext, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    // auth handlers...
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserData(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // setting user to local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    return
                }

                // if user exist, fetch data from firestore db
                console.log("FETCHING USER DATA")
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}

                if(docSnap.exists()){
                    console.log("FOUND USER DATA")
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserData(firebaseData)
            } catch (error) {
                console.log(error.message)
            }
            finally{
                setLoading(false)
            }
        })
        
        return unsubscribe
    }, [])

    const value = {
        currentUser, userData, setUserData, signup, login, logout, loading
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}