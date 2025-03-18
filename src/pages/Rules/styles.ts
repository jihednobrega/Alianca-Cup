import styled from 'styled-components'

export const RulesContainer = styled.main`
  padding-inline: 2rem;
  margin: 2rem auto 0;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .back-button {
      background-color: transparent;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      padding: 0;
      border: none;

      span {
        font-size: 1.5rem;
        color: ${(props) => props.theme['gray-300']};
      }

      svg {
        fill: ${(props) => props.theme['gray-300']};
      }
    }

    h1 {
      text-align: center;
      color: ${(props) => props.theme['gray-100']};
      margin-top: 2rem;
    }

    p {
      color: ${(props) => props.theme['gray-300']};
      line-height: 1.5;
    }

    p.subtitle {
      text-align: center;
    }

    .format-selection {
      margin-inline: auto;

      @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
        max-width: 900px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    div {
      display: flex;
      gap: 1rem;
      width: 100%;

      button {
        padding: 1.5rem 2rem;
        background-color: ${(props) => props.theme['blue-700']};
        color: ${(props) => props.theme['gray-100']};
        border: none;
        border-radius: 0.5rem;
        font-size: 1.2rem;
      }
    }

    h2 {
      color: ${(props) => props.theme['blue-300']};

      &:first-of-type {
        margin-top: 1rem;
      }
    }

    .selected-format {
      strong {
        padding-left: 1rem;
        color: ${(props) => props.theme['blue-300']};
        line-height: 1.5;
        font-size: 1.3rem;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        li {
          padding-left: 2rem;
          line-height: 1.5;
          color: ${(props) => props.theme['blue-300']};

          strong {
            font-size: 1rem;
            padding-left: 0;
          }
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        padding-left: 1rem;
        line-height: 1.5;
      }
    }

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      button {
        cursor: pointer;
      }

      div {
        button {
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: ${(props) => props.theme['blue-900']};
        }
      }
    }

    footer {
      margin-block: 1rem 4rem;
      border-top: 1px solid ${(props) => props.theme['gray-600']};
      padding-block: 0.5rem 2rem;
      font-size: 0.8rem;
      color: ${(props) => props.theme['gray-400']};
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding-inline: 5rem;
  }

  p.copyright {
    padding-block: 1rem 2rem;
    font-size: 0.75rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    background-color: ${(props) => props.theme['gray-900']};

    color: ${(props) => props.theme['gray-400']};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: space-between;

    p.copyright {
      padding-inline: 1rem;
    }
  }
`
