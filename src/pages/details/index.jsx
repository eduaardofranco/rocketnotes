
import { useState, useEffect } from 'react'
import { Container, Links, Content } from './styles'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tags'
import { ButtonText } from '../../components/ButtonText'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export function Details() {

  const [data, setData] = useState(null)
  const params = useParams()

  const navigate = useNavigate()

  function handleBack() {
    navigate("/")
  }

  async function handleDeleteNote() {
    const confirm = window.confirm('Are you sure you want to delete the note?')

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate("/")
    }
  }

  useEffect(() =>{
    async function fetchNote() {
      const response = await api.get(`notes/${params.id}`)
      setData(response.data)
    }
    fetchNote()
  },[])

  return(
    <Container>
      <Header />
      {
        //if there is data, show <main>
        data &&
        <main>
          <Content> 
          <ButtonText
            title="Delete Note"
            onClick={handleDeleteNote}
          />
          
          <h1>{data.title}</h1>
          <p>{data.description}</p>

        {
          data.links &&
          <Section title="Links">
            <Links>
            {
              data.links.map(link => (
                <li key={String(link.id)}>
                  <a href={link.url} target="_blank">{link.url}</a>
                </li>
              ))
            }
            </Links>
          </Section>
        }

        {
          data.tags &&
          <Section title="Tags">
            {
              data.tags.map(tag => (
                <Tag
                  key={String(tag.id)}
                  title={tag.name}
                />
              ))
            }
          </Section>
        }

          <Button 
            title="Back" 
            onClick={handleBack}
          />
          </Content>
        </main>
      }
    </Container>
  )
}
