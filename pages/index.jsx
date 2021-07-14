import { Box } from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import MainGrid from '../src/components/MainGrid'
import {
  AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import { useState } from 'react'

function ProfileSidebar({ githubUser }) {
  const imageURL = `https://github.com/${githubUser}.png`
  return (
    <Box as='aside'>
      <img
        src={imageURL}
        alt="profile picture"
        style={{ borderRadius: '8px'}}
      />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const initialComunity = {
    title: 'Eu odeio acorder cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }
  const [ comunities, setComunities ] = useState([initialComunity])
  const githubUser = 'aaamenezes'
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'felipefialho',
    'marcobrunodev',
    'willianjusten',
    'rodrigoktarouco',
    'andre-noel',
    'emersonbroga',
    'diego3g',
    'maykbrito'
  ]
  
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profile' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcome' }}>
          <Box>
            <h1 className="title">Bem vinde</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que vc deseja fazer?</h2>
            <form onSubmit={event => {
              event.preventDefault()
              const formData = new FormData(event.target)
              const addedComunnity = {
                title: formData.get('title'),
                image: formData.get('image')
              }
              setComunities([ ...comunities, addedComunnity ])
            }}>
              <div>
                <input
                  type='text'
                  name='title'
                  placeholder='Nome da comunidade...'
                  aria-label='Nome da comunidade...'
                />
              </div>
              <div>
                <input
                  type='text'
                  name='image'
                  placeholder='URL de capa'
                  aria-label='URL de capa'
                />
              </div>
              <div>
                <button type="submit">Criar comunidade</button>
              </div>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelations' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({comunities.length})
            </h2>
            <ul>
              {comunities.map(comunity => {
                return (
                  <li key={comunity.title}>
                    <a href={`https://github.com/${comunity.title}`}>
                      <img src={comunity.image} />
                      <span>{comunity.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map(person => {
                return (
                  <li key={person}>
                    <a href={`https://github.com/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
