import styled from 'styled-components'

export const TeamsContainer = styled.main`
  padding-top: 1rem;
  margin-inline: -1rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
    color: ${(props) => props.theme['gray-100']};
  }

  .teams-list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(16%, 6rem));
    gap: 0.5rem;

    @media (min-width: 1200px) {
      width: 50rem;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding-inline: 5rem;
  }
`

export const TeamCard = styled.div`
  img {
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    transition: transform 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
`
