import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  opacity: ${ ({ active }) => active ? 1 : .4 };
`

export default function Button({ text, type, active, onClick }) {
  return (
    <ButtonStyled type={type} active={active} onClick={onClick}>
      {text}
    </ButtonStyled>
  )
}
