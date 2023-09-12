import { api } from '../../services/api'
import { useState } from 'react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Background } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignup() {
        if(!name || !email || !password) {
            return alert("Fill all field")
        }

        api.post("/users", { name, email, password })
        .then(() => {
            alert("User registered!")
            //go to login page
            navigate("/")
        })
        .catch(error => {
            //check if there is any error message from backend 
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert("Register Failed!")
            }
        })
    }


    return(
        <Container>
            <Background />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Application for maneging and save links</p>
                <h2>Create your Account</h2>
                <Input
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button title="Register" onClick={handleSignup} />

                <Link to="/">
                    Login
                </Link>
            </Form>
        </Container>
    )
}