import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'
import { useAuth } from "../../hooks/auth" 
import { api } from '../../services/api'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from 'react-router-dom'



export function Header() {
    const { signOut, user } = useAuth()
    const navigation = useNavigate()

    function handleSignOut() {
        navigation("/")
        signOut()
    }

    //check if user has avatar, if not set placeholder avatar
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}files/${user.avatar}`: avatarPlaceholder

    return(
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />
                <div>
                    <span>Welcome</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}