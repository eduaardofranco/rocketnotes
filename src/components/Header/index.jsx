import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'

export function Header() {
    return(
        <Container>
            <Profile to="/profile">
                <img src="https://github.com/eduaardofranco.png" alt="User photo" />
                <div>
                    <span>Welcome</span>
                    <strong>Eduardo Franco</strong>
                </div>
            </Profile>
            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}