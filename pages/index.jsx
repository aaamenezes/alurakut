import { Box } from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar({ githubUser }) {
  const imageURL = `https://github.com/${githubUser}.png`
  return (
    <Box>
      <img
        src={imageURL}
        alt="profile picture"
        style={{ borderRadius: '8px'}}
      />
    </Box>
  )
}

export default function Home() {
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
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profile' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcome' }}>
          <Box>
            <h1 className="title">Bem vinde</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelations' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map(person => {
                return (
                  <li>
                    <a href={`https://github.com/${person}`} key={person}>
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
