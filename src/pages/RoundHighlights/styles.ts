import styled from 'styled-components'

export const RoundHighlightsContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  margin-inline: -2.5rem;
  overflow-y: auto;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: grid;
    grid-template-areas:
      'header .'
      'squad rounds';
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 2.5rem 1fr;
    gap: 1rem;
    padding-bottom: 2rem;
  }

  .desk-content {
    display: none;

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      display: block;
      grid-area: rounds;

      .buttons {
        width: 16rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.25rem;

        button {
          border-radius: 0.5rem;
          flex: 1;
          padding: 1rem 1.5rem;
          background-color: ${(props) => props.theme['gray-600']};
          color: ${(props) => props.theme['gray-100']};
          border: none;
          font-weight: bold;
          text-transform: uppercase;

          cursor: pointer;

          transition: background-color 0.3s ease;

          &.active {
            background-color: ${(props) => props.theme['gray-800']};

            &:hover {
              background-color: ${(props) => props.theme['gray-800']};
            }
          }

          &:hover {
            background-color: ${(props) => props.theme['gray-700']};
          }
        }
      }
    }

    @media (min-width: 1440px) {
      .buttons {
        width: 20rem;
      }
    }
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-left: 1rem;

  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme['gray-300']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    margin-bottom: 0;
    grid-area: header;

    svg:hover,
    h1:hover {
      cursor: pointer;
    }
  }
`

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  background: url('/assets/volleyball-court.jpg') no-repeat center center;
  background-size: cover;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    background: url('/assets/volleyball-court-desk.jpg') no-repeat center 100%;
    background-size: cover;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    background: url('/assets/volleyball-court-desk.jpg') no-repeat center 75%;
    background-size: cover;
    grid-area: squad;
    border-radius: 0.5rem;
  }
`

export const MainSquad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 0.5rem;
  padding: 0 1rem 4.5rem;
  justify-content: space-evenly;
  margin-top: auto;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: 2rem;
    padding: 0 1rem 6rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding: 1rem 1rem 5rem;
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.widescreen}) {
    padding: 1rem 1rem 10rem;
  }
`

export const GuidesContainer = styled.div`
  width: 100%;
  transition: height 0.5s ease;
  height: 3.5rem;
  background-color: ${(props) => props.theme['gray-800']};
  grid-area: rounds;

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 2px;
    padding-bottom: 6.5rem;
    overflow: auto;

    button {
      flex: 1;
      padding: 1.2rem 1.5rem;
      background-color: ${(props) => props.theme['gray-600']};
      color: ${(props) => props.theme['gray-100']};
      border: none;
      font-weight: bold;
      text-transform: uppercase;
      white-space: nowrap;

      cursor: pointer;

      transition: background-color 0.3s ease;

      &.active {
        background-color: ${(props) => props.theme['gray-800']};
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: none;
  }
`
