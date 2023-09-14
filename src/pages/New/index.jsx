import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function New() {

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

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


    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>New Note</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </header>

                    <Input placeholder="Title" />
                    <Textarea placeholder="Description" />

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
                            <NoteItem  value="ReactJs" />
                            <NoteItem  isnew placeholder="New Tag" />
                        </div>
                    </Section>
                    <Button title="Save" />
                </Form>
            </main>
        </Container>
    )
}