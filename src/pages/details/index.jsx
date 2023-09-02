
import { Container, Links, Content } from './styles'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tags'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  return(
    <Container>
      <Header />
      <main>
        <Content> 
        <ButtonText title="Delete Note" />
        
        <h1>React Introdution</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae id fugit laborum sequi unde. Inventore praesentium debitis ullam totam, autem vero ea dolorem veniam enim in aperiam commodi repellat eum.</p>


        <Section title="Links">
          <Links>
            <li><a href="">https://rocketseat.com.br</a></li>
            <li><a href="">https://google.com</a></li>
            <li><a href="">https://github.com</a></li>
          </Links>
        </Section>
        <Section title="Tags">
          <Tag title="reactjs" />
          <Tag title="express" />
        </Section>

        <Button title="Back" />
        </Content>
      </main>
    </Container>
  )
}
