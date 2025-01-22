import styled from 'styled-components'

export const TeamDetailsContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  margin-inline: -2.5rem;
  overflow: hidden;

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
      'squad stats'
      'subs subs';
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 2.5rem 1fr 11.25rem;
    gap: 1rem;

    .desk-stats-content {
      display: block;
      grid-area: stats;
      overflow-y: auto;
      background-color: ${(props) => props.theme['gray-800']};
      border-radius: 0.5rem;
      padding: 1rem;

      div.stats {
        overflow-y: auto;

        .team-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .stat-content {
            span:first-child {
              font-size: 2.5rem;
            }

            span:last-child {
              color: ${(props) => props.theme['gray-500']};
            }
          }

          h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }

          p {
            padding-top: 0.25rem;
            color: ${(props) => props.theme['gray-500']};

            strong {
              color: ${(props) => props.theme['gray-300']};
            }
          }

          ul {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.5rem;
            overflow-x: auto;

            li {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 0.8rem;
              padding: 0.5rem;
              background-color: ${(props) => props.theme['gray-600']};
              border-radius: 1rem;

              img {
                width: 4rem;
                height: auto;
                padding-bottom: 0.5rem;
              }

              span {
                font-size: 0.8rem;
                display: block;
                color: ${(props) => props.theme['gray-400']};
              }
            }
          }
        }
      }
    }

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

    svg:hover {
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

  background: url('/src/assets/volleyball-court.jpg') no-repeat center center;
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
  height: ${(props) => (props.isOpen ? '50vh' : '56px')};
  background-color: ${(props) => props.theme['gray-800']};

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 2px;
    /* padding: 10px 0; */

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
    padding: 2rem 1rem;
    overflow-y: auto;
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    height: calc(50vh - 56px);

    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 0.9rem;
    justify-content: space-evenly;
    margin-top: auto;

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

  .statsContent {
    padding: 2rem 1rem;
    overflow-y: auto;
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
    height: calc(50vh - 56px);

    .stats {
      .statsHeader {
        display: flex;
        align-items: center;
        gap: 1rem;

        h3 {
          font-size: 1.4rem;
        }

        button {
          width: 2.5rem;
          border: none;
          background-color: transparent;

          svg {
            color: ${(props) => props.theme['gray-100']};
          }
        }
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem;

          img {
            width: 5rem;
            height: auto;
          }

          span {
            color: ${(props) => props.theme['gray-400']};
          }
        }
      }
    }

    &:not(.open) {
      padding: 0;
      opacity: 0;
      height: 0;
    }

    .team-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr max-content;
      gap: 1rem;

      div,
      button {
        padding: 1rem;
        background-color: ${(props) => props.theme['gray-700']};
        border: 1px solid ${(props) => props.theme['gray-600']};
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .stat-content {
          border: none;
          padding: 0;
          margin-top: 1rem;

          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        &:first-child {
          & p:first-of-type {
            font-size: 3rem;
            margin-bottom: 0.2rem;
          }

          .bar {
            width: 50%;
            height: 2px;
            padding: 0;
            border: none;
            background-color: ${(props) => props.theme['gray-500']};
          }

          & p:last-child {
            font-size: 1.5rem;
            color: ${(props) => props.theme['gray-500']};
            margin-top: 0.5rem;
          }
        }

        &.overall {
          .stat-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            p {
              color: ${(props) => props.theme['gray-500']};
              strong {
                color: ${(props) => props.theme['gray-300']};
              }
            }
          }
        }

        h3 {
          font-size: 1.2rem;
        }

        p {
          color: ${(props) => props.theme['gray-100']};
          font-size: 1rem;
        }
      }

      button {
        color: ${(props) => props.theme['gray-100']};
        align-items: center;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    height: ${(props) => (props.isOpen ? '30vh' : '56px')};
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
