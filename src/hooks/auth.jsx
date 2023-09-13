import { createContext, useContext, useState, useEffect } from "react"
import { api } from '../services/api'
import { json } from "react-router-dom"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [ data, setData ] = useState({})
    
    async function signIn({ email, password }) {

        try {
            //create sesseion when login
            const response = await api.post("/sessions", { email, password })
            const { user, token } = response.data

            //set user and token to the localstorage
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", token)

            //insert token type bearer of authorization in the header off all requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({ user, token })

        } catch(error) {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert('Fail to Enter')
            }
        }


    }

    function signOut() {
        //remove user and token from localstorage
        const token = localStorage.removeItem("@rocketnotes:token")
        const user = localStorage.removeItem("@rocketnotes:user")
        
        //set data state as empty again
        setData({})
    }

    async function updateProfile({ user }) {
        try {
            //register the user in the database
            await api.put("/users", user)
            //set user in the localstorage
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

            //set the user new infos to the data, and keep user token from data
            setData({ user, token: data.token})
            alert('Profile updated')

        } catch(error) {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert('Fail to update profile')
            }
        }
    }


    useEffect(() => {
        //when page reloads, get user and token from localstorage
        //and set it again to the api header
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })

        }
    }, [])

    return(
    <AuthContext.Provider value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user
        }}>
        {/* children is <Routes> that is inside AuthProvider in main.js */}
        { children }
    </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }