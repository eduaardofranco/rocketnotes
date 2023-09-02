import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Container, Form, Background } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function SignIn() {
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
                />
                <Input
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                />
                <Button title="Enter" />

                <Link to="/register">
                    Rgister
                </Link>
            </Form>
            <Background />
        </Container>
    )
}