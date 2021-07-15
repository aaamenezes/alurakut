import { useEffect, useState } from 'react'
import { Box } from '../src/components/Box'
import ProfileRelationsBox from '../src/components/ProfileRelations'
import MainGrid from '../src/components/MainGrid'
import {
  AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'

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
  const githubUser = 'aaamenezes'
  const initialCommunity = {
    title: 'Eu odeio acorder cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://www.orkut.com/'
  }
  const [ communities, setCommunities ] = useState([initialCommunity])
  const favoritePeople = [
    'omariosouto',
    'rodrigoktarouco',
    'andre-noel',
    'juunegreiros',
    'felipefialho',
    'diego3g',
    // 'peas',
    // 'rafaballerini',
    // 'marcobrunodev',
    // 'willianjusten',
    // 'emersonbroga',
    // 'maykbrito'
  ]

  const [ followers, setFollowers ] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users/aaamenezes/followers')
      .then(r => r.json())
      .then(r => {
        const rFormatted = r.map(item => item.login)
        setFollowers(rFormatted)
      })
  }, [])

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
              if (communities.length < 6) {
                const formData = new FormData(event.target)
                const addedCommunity = {
                  title: formData.get('title'),
                  image: formData.get('image'),
                  url: formData.get('url')
                }
                setCommunities([ ...communities, addedCommunity ])
              }
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
                <input
                  type='text'
                  name='url'
                  placeholder='URL de direcionamento'
                  aria-label='URL de direcionamento'
                />
              </div>
              <div>
                <button type="submit">Criar comunidade</button>
              </div>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelations' }}>
          <ProfileRelationsBox
            title='Seguidores'
            listItems={followers}
          />
          <ProfileRelationsBox
            title='Comunidades'
            listItems={communities}
          />
          <ProfileRelationsBox
            title='Pessoas da comunidade'
            listItems={favoritePeople}
          />
        </div>
      </MainGrid>
    </>
  )
}
