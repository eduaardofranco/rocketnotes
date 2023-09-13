import { Container, Form, Avatar } from './styles'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useAuth} from '../../hooks/auth'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { api } from '../../services/api'

export function Profile() {
    const { user, updateProfile } = useAuth()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()

    //check if user has avatar, if not set placeholder avatar
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}files/${user.avatar}`: avatarPlaceholder

    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState(null)

    async function handleUpdate() {
        const user = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        await updateProfile({ user, avatarFile })
    }

    function handleChangeAvatar(event) {
        //get the file user selected w/ input
        const file = event.target.files[0]
        setAvatarFile(file)

        //create an url and set the avatar which will change on the doom
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }


    return(
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>
            <Form>
                <Avatar>
                    <img 
                        src={avatar}
                        alt={user.name}
                    />
                    <label htmlFor='avatar'>
                        <FiCamera />
                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>
                <Input 
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                 <Input 
                    placeholder="Email"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                 <Input 
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                <Input 
                    placeholder="New Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />
                <Button title="Save" onClick={handleUpdate} />
            </Form>
        </Container>
    )
}