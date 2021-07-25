import ProfileRelationsBox from '../ProfileRelations'

export default function ProfileRelationsArea({
  followers,
  favoritePeople,
  setFavoritePeople,
  communities,
  setCommunities
}) {
  return (
    <>
      <div className='profileRelationsArea' style={{ gridArea: 'profileRelations' }}>
        <ProfileRelationsBox
          title='Seguidores'
          listItems={followers}
        />
        <ProfileRelationsBox
          title='Comunidades'
          listItems={communities}
          setListItems={setCommunities}
          deleteOption
        />
        <ProfileRelationsBox
          title='Pessoas da comunidade'
          listItems={favoritePeople}
          setListItems={setFavoritePeople}
          deleteOption
        />
      </div>
    </>
  )
}
