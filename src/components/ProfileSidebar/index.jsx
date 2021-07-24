import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'
import { Box } from '../Box'

export default function ProfileSidebar({ githubUser }) {
  const imageURL = `https://github.com/${githubUser}.png`
  return (
    <>
      <div className='profileArea' style={{ gridArea: 'profile' }}>
        <Box as='aside'>
          <img
            src={imageURL}
            alt="profile picture"
            style={{ borderRadius: '8px' }}
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
      </div>
    </>
  )
}
