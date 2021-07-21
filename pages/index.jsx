import React from 'react'
import { useEffect, useState } from 'react'
import nookie from 'nookies'
import jwt from 'jsonwebtoken'
import { Box } from '../src/components/Box'
import ProfileRelationsBox from '../src/components/ProfileRelations'
import MainGrid from '../src/components/MainGrid'
import {
  AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import Button from '../src/components/Button'

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

export default function Home({ githubUser }) {
  const [ communities, setCommunities ] = useState([])
  const [ favoritePeople, setFavoritePeople ] = useState([])

  // 'omariosouto',
  // 'andre-noel',
  // 'juunegreiros',
  // 'felipefialho',
  // 'diego3g',
  // 'peas',
  // 'rafaballerini',
  // 'marcobrunodev',
  // 'willianjusten',
  // 'emersonbroga',
  // 'maykbrito'

  const [ followers, setFollowers ] = useState([])

  useEffect(() => {
    // Carregar seguidores do Github
    fetch('https://api.github.com/users/aaamenezes/followers')
      .then(r => r.json())
      .then(r => {
        const rFormatted = r.map(item => {
          return {
            title: item.login,
            imageUrl: item.avatar_url,
            pageUrl: item.html_url
          }
        })
        setFollowers(rFormatted)
      })

    // Carregar comunidades no DatoCMS - GraphQL
    const communityQuery = {
      query: `query {
        allCommunities {
          id
          title
          imageUrl
          pageUrl
        }
      }`
    }

    const cmsurl = 'https://graphql.datocms.com/'
    const apiToken = '5562720c87d0c6d702ed3649a523ba'

    fetch(cmsurl, {
      method: 'POST',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(communityQuery)
    })
      .then(r => r.json())
      .then(r => setCommunities(r.data.allCommunities))
    
    // Carregar pessoas da comunidade de programação no DatoCMS - GraphQL
    const favoritePeopleQuery = {
      query: `query {
        allPeople {
          nickname
        }
      }`
    }

    fetch(cmsurl, {
      method: 'POST',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(favoritePeopleQuery)
    })
      .then(r => r.json())
      .then(r => {
        const favoritePeople = r.data.allPeople.map(person => {
          return {
            title: person.nickname,
            imageUrl: `https://github.com/${person.nickname}.png`,
            pageUrl: `https://github.com/${person.nickname}`
          }
        })
        setFavoritePeople(favoritePeople)
      })

  }, [])

  const [ activeForm, setActiveForm ] = useState('community')

  function handleSubmitCommunity(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const addedCommunity = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      pageUrl: formData.get('url'),
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedCommunity)
    })
      .then(async r => {
        const data = await r.json()
        setCommunities([ ...communities, data.createdRegister ])
      })
  }

  function handleSubmitPerson(event) {
    
  }

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
            <Box style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: 0,
              paddingRight: 0,
            }}>
              <Button
                type='button'
                text='Criar comunidade'
                active={activeForm === 'community'}
                onClick={() => setActiveForm('community')}
              />
              <Button
                type='button'
                text='Adicionar pessoa da comunidade'
                active={activeForm === 'person'}
                onClick={() => setActiveForm('person')}
              />
            </Box>
            {
              activeForm === 'community' &&
              <form onSubmit={handleSubmitCommunity}>
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
            }
            {
              activeForm === 'person' &&
              <form onSubmit={handleSubmitPerson}>
                <div>
                  <input
                    type='text'
                    name='nickname'
                    placeholder='Nick da pessoa no Github...'
                    aria-label='Nick da pessoa no Github...'
                  />
                </div>
                <div>
                  <button type="submit">Adicionar pessoa</button>
                </div>
              </form>
            }
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelations' }}>
          <ProfileRelationsBox
            title='Seguidores'
            type='person'
            listItems={followers}
          />
          <ProfileRelationsBox
            title='Comunidades'
            type='community'
            listItems={communities}
          />
          <ProfileRelationsBox
            title='Pessoas da comunidade'
            type='person'
            listItems={favoritePeople}
          />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookie.get(context)
  const token = cookies.USER_TOKEN
  
  const { isAuthenticated } = fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then(r => r.json())
  
  const { githubUser } = jwt.decode(token)

  // if (!isAuthenticated) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   }
  // }

  return { props: { githubUser } }
}
