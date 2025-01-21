import styled from 'styled-components'

export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['blue-300']};
    }

    &.active {
      color: ${(props) => props.theme['blue-300']};
      border-bottom: 3px solid ${(props) => props.theme['blue-300']};
    }

    p {
      display: none;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    flex-direction: column;

    a {
      width: 100%;
      height: auto;
      flex-direction: column;
      gap: 0.5rem;
      text-decoration: none;

      p {
        display: block;
        font-size: 0.8rem;
        padding-bottom: 0.25rem;
      }
    }
  }
`

export const NavBarWrapper = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-inline: auto;

  p.copyright {
    /* margin-top: auto; */
    /* padding: 0.625rem; */
    margin-block: 1rem;
    font-size: 0.75rem;
    text-align: center;

    color: ${(props) => props.theme['gray-400']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: space-between;

    p.copyright {
      padding-inline: 1rem;
    }
  }
`
