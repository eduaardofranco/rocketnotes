
import { useAuth } from '../../hooks/auth'

import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Container, Form, Background } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useState } from 'react'

export function SignIn() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { signIn } = useAuth()

    function handleSignIn() {
        
        signIn({ email, password })
    }

    return(
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Application for maneging and save links</p>
                <h2>Sign In</h2>
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={ e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={ e => setPassword(e.target.value)}
                />
                <Button title="Enter" onClick={ handleSignIn } />

                <Link to="/register">
                    Rgister
                </Link>
            </Form>
            <Background />
        </Container>
    )
}