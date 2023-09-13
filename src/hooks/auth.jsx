import { createContext, useContext, useState } from "react"
import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [ data, setData ] = useState({})
    
    async function signIn({ email, password }) {

        try {
            //create sesseion when login
            const response = await api.post("/sessions", { email, password })
            const { user, token } = response.data

            //insert token type bearer of authorization in the header off all requests
            api.defaults.headers.authorization = `Bearer ${token}`
            setData({ user, token })

        } catch(error) {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert('Fail to Enter')
            }
        }


    }

    return(
    <AuthContext.Provider value={{ signIn, user: data.user }}>
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