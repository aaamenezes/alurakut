import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons'
import { Box } from '../Box'
import Button from '../Button'

export default function WelcomeArea({
  activeForm, setActiveForm, handleSubmitCommunity, handleSubmitPerson
}) {
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