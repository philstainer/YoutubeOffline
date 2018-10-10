import styled from 'styled-components'

export default styled.button`
  background: ${props => props.green ? '#00BB7D' : (props => props.blue ? '#3A9CFB' : '#fff') };
  color: ${props => props.green ? '#fff' : (props => props.blue ? '#fff' : '#333') };
  padding: ${props => props.large ? '2rem 4rem' : (props => props.medium ? '1rem 2rem' : '.5rem 1rem') };
  border: 2px solid ${props => props.green ? '#00BB7D' : (props => props.blue ? '#3A9CFB' : '#333') };;
  border-radius: 3px;
  outline: none;
  font-size: ${props => props.large ? '4rem' : (props => props.medium ? '2rem' : '1rem') };
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;

  -webkit-app-region: no-drag;

  span {
    margin-right: 5px;
  }

  &:hover {
    box-shadow: 0 1rem 4rem rgba(0,0,0,.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(-2px);
  }
`