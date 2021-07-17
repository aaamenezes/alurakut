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

export default function Home(props) {
  const githubUser = props.githubUser
  const [ communities, setCommunities ] = useState([])
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

    // GraphQL
    const communityQuery = {
      query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`
    }

    const communityConf = {
      method: 'POST',
      headers: {
        'Authorization': '5562720c87d0c6d702ed3649a523ba',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(communityQuery)
    }

    const queryURL = 'https://graphql.datocms.com/'

    fetch(queryURL, communityConf)
      .then(r => r.json())
      .then(r => {
        setCommunities(r.data.allCommunities)
      })
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    if (communities.length < 6) {
      const formData = new FormData(event.target)

      const addedCommunity = {
        title: formData.get('title'),
        imageUrl: formData.get('image'),
        creatorSlug: githubUser
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
            <h2 className='subTitle'>O que vc deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
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
