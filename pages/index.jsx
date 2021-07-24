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

  useEffect(() => {
    // Carregar seguidores do Github
    UseRequest('https://api.github.com/users/aaamenezes/followers').then(res => {
      const followersFormatted = res.map(follower => formatGithubPerson(follower.login))
      setFollowers(followersFormatted)
    })

    const cmsurl = 'https://graphql.datocms.com/'
    const apiToken = '5562720c87d0c6d702ed3649a523ba'

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
    
    // Carregar pessoas da comunidade de programação no DatoCMS - GraphQL
    const favoritePeopleQuery = {
      query: `query {
        allPeople {
          nickname
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
      const favoritePeople = res.data.allPeople.map(person => formatGithubPerson(person.nickname))
      setFavoritePeople(favoritePeople)
    })

  }, [])

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
    event.preventDefault()
    const formData = new FormData(event.target)

    const addedPerson = {
      nickname: formData.get('nickname')
    }

    fetch('/api/person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedPerson)
    })
      .then(async res => {
        const data = await res.json()
        const newGithubPerson = formatGithubPerson(data.createdRegister.nickname)
        setFavoritePeople([ ...favoritePeople, newGithubPerson ])
      })
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <ProfileSidebar githubUser={githubUser} />
        <WelcomeArea
          githubUser={githubUser}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          handleSubmitCommunity={handleSubmitCommunity}
          handleSubmitPerson={handleSubmitPerson}
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
