import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

export function New() {
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
                        <NoteItem  value="https://github.com/eduaardofranco" />
                        <NoteItem  isnew placeholder="New Link" />

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