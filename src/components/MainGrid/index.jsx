import styled from 'styled-components'

const MainGrid = styled.main`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  max-width: 500px;
  padding: 16px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 860px) {
    grid-template-areas: 'profile welcome profileRelations';
    grid-template-columns: 160px 1fr 312px;
    max-width: 1110px;
  }

  .profile-area {
    display: none;

    @media (min-width: 860px) {
      display: block;
    }
  }
`

export default MainGrid
