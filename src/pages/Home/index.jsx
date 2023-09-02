import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

import { Input } from '../../components/Input'
import { FiPlus, FiSearch } from 'react-icons/fi'

export function Home() {
    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>
           
            <Header />
            
            <Menu>
                <li><ButtonText title="All" /></li>
                <li><ButtonText title="React" isActive /></li>
                <li><ButtonText title="Node" /></li>
            </Menu>
            
            <Search>
                <Input placeholder="Search by title" icon={FiSearch} />
            </Search>
            
            <Content>
                <Section title="My notes">
                    <Note data={{
                        title: 'react',
                        tags: [
                            {id: 1, name: "React"},
                            {id: 2, name: "NodeJs"}
                        ]
                        }}/>
                        
                </Section>
            </Content>
           
            <NewNote to="/new">
                <FiPlus />
                New note
            </NewNote>
        </Container>
    )
}