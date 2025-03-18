import styled from 'styled-components'

export const RankingContainer = styled.main`
  max-width: 46rem;
  flex: 1;
  padding-top: 1rem;

  display: flex;
  flex-direction: column;

  margin-inline: -1rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};

    margin-inline: auto;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    max-width: 49rem;
  }
`

export const RankingList = styled.div`
  margin-top: 2rem;

  .mainTable {
    display: flex;
    justify-content: center;

    table {
      max-width: 9rem;
      width: 100%;
      border-collapse: collapse;

      th {
        background-color: ${(props) => props.theme['gray-600']};
        padding: 1rem;
        text-align: center;
        color: ${(props) => props.theme['gray-100']};
        font-size: 0.875rem;
        line-height: 1.6;
      }

      td {
        height: 3rem;
        background-color: ${(props) => props.theme['gray-700']};
        padding-inline: 1rem;
        padding-block: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.6;

        &.team {
          width: 9rem;

          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        strong {
          font-size: 1rem;
        }

        img {
          width: 3rem;
          height: 3rem;
          margin-left: 0.75rem;
          border-radius: 50%;
          object-fit: cover;
        }

        ul {
          display: flex;
          align-items: center;
        }
      }
    }

    & > table {
      th {
        border-top-left-radius: 0.5rem;
      }
      tr {
        &:last-child {
          td {
            &:first-child {
              border-bottom-left-radius: 0.5rem;
            }
          }
        }
      }
    }

    & > div {
      overflow-x: auto;

      table {
        th {
          &:last-child {
            border-top-right-radius: 0.5rem;
          }
        }
        tr {
          &:last-child {
            td {
              &:last-child {
                border-bottom-right-radius: 0.5rem;
              }
            }
          }
        }
      }
    }

    .nameOnDesk {
      display: none;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      .nameOnMobile {
        display: none;
      }

      .nameOnDesk {
        display: block;
      }

      table {
        max-width: 12rem;

        td {
          &.team {
            width: 12rem;
          }
        }
      }
    }
  }
`

const GAME_RESULT_COLORS = {
  win: 'green-500',
  lose: 'red-500',
} as const

interface LastGamesProps {
  gameResultColor: keyof typeof GAME_RESULT_COLORS
}

export const History = styled.li<LastGamesProps>`
  list-style: none;
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${(props) =>
    props.theme[GAME_RESULT_COLORS[props.gameResultColor]]};
  border-radius: 999px;
  margin-right: 0.25rem;
`

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  font-size: 0.75rem;
  font-style: italic;
  color: ${(props) => props.theme['gray-400']};
`
