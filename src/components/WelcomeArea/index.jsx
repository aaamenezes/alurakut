import { Box } from '../Box'
import Button from '../Button'
import formatGithubPerson from '../../utils/formatGithubPerson'
import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons'

export default function WelcomeArea({
  activeForm,
  setActiveForm,
  favoritePeople,
  setFavoritePeople,
  communities,
  setCommunities
}) {

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

    fetch('/api/addPerson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedPerson)
    })
      .then(async res => {
        const data = await res.json()
        const newGithubPerson = formatGithubPerson(data.createdRegister)
        setFavoritePeople([ ...favoritePeople, newGithubPerson ])
      })
  }

  return (
    <>
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
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  name='image'
                  placeholder='URL de capa'
                  aria-label='URL de capa'
                  required
                />
              </div>
              <div>
                <input
                  type='text'
                  name='url'
                  placeholder='URL de direcionamento'
                  aria-label='URL de direcionamento'
                  required
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
                  placeholder='Insira o nick da pessoa no Github...'
                  aria-label='Insira o nick da pessoa no Github...'
                  required
                />
              </div>
              <div>
                <button type="submit">Adicionar pessoa</button>
              </div>
            </form>
          }
        </Box>
      </div>
    </>
  )
}