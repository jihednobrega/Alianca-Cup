import styled from 'styled-components'

export const ChampionshipTeamContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  margin-inline: -2.5rem;
  overflow-y: auto;

  .desk-stats-content {
    display: none;
  }

  .desk-subs-content {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: grid;
    grid-template-areas:
      'header header'
      'squad squad'
      'subs subs';
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 2.5rem 1fr 11.25rem;
    gap: 1rem;

    .desk-subs-content {
      grid-area: subs;
      display: grid;
      justify-content: space-evenly;
      gap: 0.5rem;
      padding: 0.5rem;
      grid-template-columns: repeat(8, max-content);
      overflow-x: auto;
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
      cursor: auto;
      user-select: none;
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
  padding: 0 1rem 6.5rem;
  justify-content: space-evenly;
  margin-top: auto;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: 2rem;
    padding: 0 1rem 8rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding: 1rem 1rem 3rem;
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.widescreen}) {
    padding: 1rem 1rem 8rem;
  }
`

export const GuidesContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.5s ease;
  height: ${(props) => (props.isOpen ? '50vh' : '3.5rem')};
  background-color: ${(props) => props.theme['gray-800']};

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 2px;
    padding-bottom: 6.5rem;

    button {
      flex: 1;
      padding: 1rem 1.5rem;
      background-color: ${(props) => props.theme['gray-600']};
      color: ${(props) => props.theme['gray-100']};
      border: none;
      font-weight: bold;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      cursor: pointer;

      transition: background-color 0.3s ease;

      &.active {
        background-color: ${(props) => props.theme['gray-800']};
      }
    }
  }

  .subsContent {
    padding: 2rem 1rem 6.5rem;
    overflow-y: auto;
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    height: calc(50vh - 3.5rem);

    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 0.9rem;
    justify-content: space-evenly;
    /* margin-top: auto; */
    position: absolute;
    top: 3.5rem;
    left: 0;
    right: 0;

    &:not(.open) {
      padding: 0;
      opacity: 0;
      height: 0;
    }

    @media (min-width: 548px) {
      grid-template-columns: repeat(4, max-content);
    }

    @media (min-width: 688px) {
      grid-template-columns: repeat(5, max-content);
    }

    @media (min-width: 820px) {
      grid-template-columns: repeat(6, max-content);
    }

    @media (min-width: 960px) {
      grid-template-columns: repeat(7, max-content);
    }

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      grid-template-columns: repeat(8, max-content);
      height: initial;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    height: ${(props) => (props.isOpen ? '30vh' : '3.5rem')};
    display: none;
  }
`
export const LiberoButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: -0.7rem;
  background-color: ${(props) => props.theme['gray-800']};
  color: ${(props) => props.theme['white']};
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme['gray-600']};
    }
  }
`
