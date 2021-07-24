import React from 'react'
import { useEffect, useState } from 'react'
import nookie from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import UseRequest from '../src/utils/UseRequest'
import formatGithubPerson from '../src/utils/formatGithubPerson'
import ProfileSidebar from '../src/components/ProfileSidebar'
import WelcomeArea from '../src/components/WelcomeArea'
import ProfileRelationsArea from '../src/components/ProfileRelationsArea'

export default function Home({ githubUser }) {
  const [ communities, setCommunities ] = useState([])
  const [ favoritePeople, setFavoritePeople ] = useState([])
  const [ followers, setFollowers ] = useState([])
  const [ activeForm, setActiveForm ] = useState('community')

  const cmsurl = 'https://graphql.datocms.com/'
  const apiToken = '5562720c87d0c6d702ed3649a523ba'

  useEffect(() => {
    // Carregar seguidores do Github
    UseRequest(`https://api.github.com/users/${githubUser}/followers`).then(res => {
      const followersFormatted = res.map(follower => formatGithubPerson(follower.login))
      setFollowers(followersFormatted)
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

    const communityRequestOptions = {
      method: 'POST',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(communityQuery)
    }

    UseRequest(cmsurl, communityRequestOptions).then(res => {
      setCommunities(res.data.allCommunities)
    })
    
  }, [])

  useEffect(() => { // Carregar pessoas da comunidade de programação no DatoCMS - GraphQL
    const favoritePeopleQuery = {
      query: `query {
        allPeople {
          nickname
          id
        }
      }`
    }

    const favoritePeopleRequestOptions = {
      method: 'POST',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(favoritePeopleQuery)
    }

    UseRequest(cmsurl, favoritePeopleRequestOptions).then(res => {
      const favoritePeople = res.data.allPeople.map(person => formatGithubPerson(person))
      setFavoritePeople(favoritePeople)
    })
  }, [favoritePeople])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <ProfileSidebar githubUser={githubUser} />
        <WelcomeArea
          githubUser={githubUser}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
        <ProfileRelationsArea
          followers={followers}
          communities={communities}
          favoritePeople={favoritePeople}
        />
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookie.get(context)
  if (!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const token = cookies.USER_TOKEN
  const { githubUser } = jwt.decode(token)
  return { props: { githubUser } }
}
