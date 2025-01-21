import styled from 'styled-components'

export const CalendarContainer = styled.div`
  margin-inline: -1rem;
  padding-bottom: 8rem;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    font-family: 'Roboto Mono', monospace;
    color: ${(props) => props.theme['gray-100']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    margin-inline: 10rem 0;
    padding-bottom: 2rem;
    overflow-y: auto;

    display: grid;
    grid-template-areas: 'month month' 'game1 game2';
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    h1 {
      width: 10rem;
    }
  }
`

export const RoundHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-inline: 2rem;
  gap: 1rem;

  button {
    background-color: ${(props) => props.theme['gray-900']};
    border: none;
    color: ${(props) => props.theme['gray-100']};
    cursor: pointer;
    width: 5rem;

    &:disabled {
      color: ${(props) => props.theme['gray-400']};
      cursor: not-allowed;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: space-evenly;
    grid-area: month;
    gap: 4rem;

    button {
      max-height: 1.5rem;
    }
  }
`

export const MonthSection = styled.div`
  margin-top: 2rem;

  h2 {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${(props) => props.theme['blue-500']};
  }

  .games-list {
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme['gray-800']};
    padding: 1rem 2rem;
    border-radius: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    width: 38vw;

    &:nth-child(0) {
      grid-area: game1;
    }

    &:nth-child(1) {
      grid-area: game2;
    }
  }
`

export const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-block: 1rem;

  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme['gray-600']};
  }

  .matchResult {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .team {
    text-align: center;
    flex: 1;

    img {
      max-width: 4rem;
      height: auto;
    }

    p {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  p.versus {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${(props) => props.theme['gray-500']};
    padding-inline: 0.5rem;
  }

  .localAndTime {
    font-family: 'Roboto Mono', monospace;

    font-size: 0.8rem;
    font-weight: bold;

    color: ${(props) => props.theme['gray-500']};
  }

  .score {
    font-family: 'Roboto Mono', monospace;

    font-size: 0.8rem;
    color: ${(props) => props.theme['gray-500']};
  }
`
