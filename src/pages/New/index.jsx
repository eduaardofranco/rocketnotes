import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function New() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleAddLink() {
        //add new link only if link is not empty
        if(newLink) {
            setLinks(prevState => [...prevState, newLink])
            //reset state
            setNewLink("")

        }
    }

    function handleRemoveLink(deleted) {
        //will remove the link I want from array links by its index
        setLinks(prevState => prevState.filter((link, index) => index !== deleted))
    }

    function handleAddTag() {
        //add new link only if link is not empty
        if(newTag) {
            setTags(prevState => [...prevState, newTag])
            //reset state
            setNewTag("")

        }
    }

    function handleRemoveTag(deleted) {
        //will remove the link I want from array links by its index
        setTags(prevState => prevState.filter((link, index) => index !== deleted))
    }

    async function handleNewNote() {

        //title mandatory
        if(!title) {
            return alert("Title not informed")
        }

        //if there is link not add in the field
        if(newLink) {
            return alert('You have a link to add')
        }

        //if there is tag not add in the field
        if(newTag) {
            return alert('You have a tag to add')
        }
        
        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })
        alert("Note created Sucessfully")
        //navigate to home
        navigate("/")
    }
    function handleBack() {
        navigate(-1)
      }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>New Note</h1>
                        <ButtonText
                            title="Back"
                            onClick={handleBack}
                        />
                    </header>

                    <Input
                        placeholder="Title"
                        onChange={e=> setTitle(e.target.value)}    
                    />
                    <Textarea
                        placeholder="Description"
                        onChange={e=> setDescription(e.target.value)} 
                    />

                    <Section title="Links">
                        
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(index)}
                                />
                            ))
                        }

                        <NoteItem
                            isnew
                            placeholder="New Link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />

                    </Section>
                    <Section title="Tags">
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(index)}
                                    />
                                ))
                            }
                            <NoteItem
                                isnew
                                placeholder="New Tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button
                        title="Save"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}