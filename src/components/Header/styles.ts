import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
    }

    span {
      font-family: 'Roboto Mono', monospace;
      text-transform: uppercase;
      font-size: 1.5rem;
      font-weight: bold;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      flex-direction: column;

      img {
        width: 3rem;
        height: 3rem;
      }

      span {
        font-size: 1rem;
      }
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding: 0 1rem;

    cursor: pointer;
  }
`
