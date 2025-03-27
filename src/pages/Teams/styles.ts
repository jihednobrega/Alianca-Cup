import styled from 'styled-components'

export const TeamsContainer = styled.main`
  padding-top: 1rem;
  padding-bottom: 9rem;
  margin-inline: -1rem;
  text-align: center;

  h1 {
    color: ${(props) => props.theme['gray-100']};
  }

  h2 {
    font-size: 1.2rem;
    margin-block: 1.2rem 0.8rem;
  }

  .teams-list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(16%, 6rem));
    gap: 0.5rem;

    @media (min-width: 1200px) {
      width: 50rem;
      margin-inline: auto;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    h2 {
      margin-block: 2rem 0.8rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding-inline: 5rem;
  }

  @media (min-width: 1400px) {
    margin-inline: auto !important;

    h2 {
      margin-block: 2.5rem 1rem;
    }
  }
`

export const TeamCard = styled.div`
  overflow: hidden;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme['gray-700']};
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.15);
    }
  }
`
