import styled from 'styled-components'

export default styled.div`
  padding: 1rem;
  display: flex;
  max-height: 80px;
  min-height: 80px;
  min-width: 100%;
  box-shadow: 0 .1rem 5rem rgba(0,0,0,0.1);
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  div:nth-child(1) {
    position: relative;
    display: block;

    img {
      height: 100%;
    }

    span {
      position: absolute;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.4);
      padding: 2px 10px;
      color: #fff;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    
    h3 {
      font-size: 1.6rem;
      font-weight: 400;
      letter-spacing: 1px;
    }

    a {
      font-size: 1rem;      
      color: blue;
      margin-top: 5px;      
      text-decoration: underline;
      -webkit-app-region: no-drag;
    }
  }

  div:nth-child(3) {
    display: flex;
    margin-left: auto;
    align-items: center;

    button {
      padding: 1rem 2rem;
      border: none;
      font-size: 2rem;
      background: transparent;

      &:hover {
        box-shadow: none;
      }
    }
  }
`