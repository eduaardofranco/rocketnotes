import { Container } from './styles'

export function Input({icon: Icon, ...rest}) {
    return(
        <Container>
            {/* only show icon if this was passed */}
            {Icon && <Icon size={20} />}
            <input {...rest} />
        </Container>
    )
}