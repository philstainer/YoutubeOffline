import styled from 'styled-components'

export default styled.input`
  padding: 1rem 2rem;

  flex: 0 0 60%;
  font-size: 1.6rem;
  font-weight: 400;
  font-family: inherit;

  border: 1px solid #BDBDBD;
  border-radius: 3px;
  transition: all .2s;

  -webkit-app-region: no-drag;

  &:focus {
    outline: none;
    flex: 0 0 65%;
    box-shadow: 0 .5 2rem rgba(0,0,0,.2);
  }
`