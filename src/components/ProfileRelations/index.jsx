import styled from 'styled-components'
import { Box } from '../Box'

const ProfileRelationsBoxStyled = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    /* max-height: 220px; */
    list-style: none;

    li {
      position: relative;

      &:hover {
       .close, .nickname {
          opacity: 1;
        }
      }

      .close {
        color: #FFFFFF;
        font-size: 20px;
        line-height: .6;
        position: absolute;
        top: 4px;
        right: 4px;
        z-index: 2;
        display: -webkit-box;
        opacity: 0;
        transition: .3s;
        -webkit-line-clamp: 3;
        user-select: none;
        -webkit-box-orient: vertical;
        cursor: pointer;
        
        &:hover {
          opacity: 1;
          transform: scale(1.4)
        }
      }
    }
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    &:hover {
      opacity: 1;
    }
    .nickname {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      opacity: 0;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`

function handleRemove(event, itemID, listItems, setListItems) {
  fetch('/api/removeRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'itemID': itemID
    }
  })
    .then(res => res.json())
    .then(res => {
      const newListItems = listItems.filter(item => item.id !== res.res.id)
      setListItems(newListItems)
    })
}

function ProfileRelationsBox({ title, listItems, setListItems, deleteOption }) {
  return (
    <ProfileRelationsBoxStyled>
      <h2 className='smallTitle'>
        {title} ({listItems.length})
      </h2>
      <ul>
        {listItems.map((item, index) => {
          return (
            <li key={item.title + ' ' + index}>
              <a href={item.pageUrl} target='_blank' rel='external noopener'>
                <img src={item.imageUrl} />
                <span className='nickname'>{item.title}</span>
              </a>
              {
                deleteOption && (
                <span className="close" onClick={
                  event => handleRemove(event, item.id, listItems, setListItems)
                }>
                  &times;
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxStyled>
  )
}

export default ProfileRelationsBox
