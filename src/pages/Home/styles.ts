import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;

  p.copyright {
    margin-block: 0 1rem;
    padding-block: 1rem;
    font-size: 0.75rem;
    text-align: center;

    color: ${(props) => props.theme['gray-400']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);

    p.copyright {
      padding-inline: 1rem;
    }
  }
`
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: ${(props) => props.theme['gray-100']};
  padding: 4rem 1.5rem 1rem;
  text-align: center;

  h1 {
    font-size: 3rem;
  }

  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    img {
      width: 5rem;
      height: 5rem;
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
        width: 5rem;
        height: 5rem;
      }

      span {
        font-size: 1.5rem;
      }
    }
  }
`

export const Button = styled.button`
  padding: 1.5rem 2.5rem;
  background-color: ${(props) => props.theme['blue-700']};
  color: ${(props) => props.theme['gray-300']};
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    &:hover {
      background-color: ${(props) => props.theme['blue-900']};
      /* color: ${(props) => props.theme['gray-900']}; */

      scale: 1.05;
    }
  }
`

export const HighlightsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  padding: 1rem 1.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.widescreen}) {
    padding: 1rem 10rem;
  }
`

export const HighlightCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme['gray-600']};
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;

  ul {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.5rem;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      strong {
        font-size: 0.9rem;
      }
    }

    a {
      text-decoration: none;
      color: ${(props) => props.theme['gray-300']};
    }
  }

  h2 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme['blue-300']};
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${(props) => props.theme['gray-300']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    &:hover {
      background-color: ${(props) => props.theme['blue-300']};
      scale: 1.05;

      h2,
      p,
      strong {
        color: ${(props) => props.theme['gray-900']};
      }

      h2 {
        font-size: 1.5rem;
      }

      svg {
        fill: ${(props) => props.theme['gray-900']};
        transition: scale 0.3s;

        &:hover {
          scale: 1.25;
          fill: ${(props) => props.theme['blue-900']};
        }
      }
    }
  }
`
