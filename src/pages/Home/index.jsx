import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import { FiPlus, FiSearch } from 'react-icons/fi'

export function Home() {
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [search, setSearch] = useState("")
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()

    function handleTagSelected(tagName) {
        //if all clicked
        if(tagName === "all") {
            return setTagsSelected("")
        }
        const alreadySelected = tagsSelected.includes(tagName)
        
        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        } else {
            
            setTagsSelected(prevState => [...prevState, tagName])
        }

    }

    function handleDetails(id) {
        //when note clicked, navigate to detail / its id
        navigate(`/details/${id}`)
    }


    useEffect(() => {

        async function fetchTags() {
            const response = await api.get("/tags")
            //save tags inside setTags
            setTags(response.data)
        }
        
        fetchTags()
    },[])

    useEffect(() =>{
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }
        fetchNotes()
    },[tagsSelected, search])


    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>
           
            <Header />
            
            <Menu>
                <li>
                    <ButtonText
                        title="All"
                        onClick={() => handleTagSelected("all")}
                        //if array tagSelected is empty, means no tag is active so active "All"
                        isActive={tagsSelected.length === 0}
                    />
                </li>

                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                              title={tag.name}
                              onClick={() => handleTagSelected(tag.name)}
                              isActive={tagsSelected.includes(tag.name)}

                            />
                        </li>
                    ))
                }
            </Menu>
            
            <Search>
                <Input
                    placeholder="Search by title"
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>
            
            <Content>
                <Section title="My notes">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))

                    }
                        
                </Section>
            </Content>
           
            <NewNote to="/new">
                <FiPlus />
                New note
            </NewNote>
        </Container>
    )
}