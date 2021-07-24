import ProfileRelationsBox from '../ProfileRelations'

export default function ProfileRelationsArea({ followers, communities, favoritePeople }) {
  return (
    <>
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
    </>
  )
}
