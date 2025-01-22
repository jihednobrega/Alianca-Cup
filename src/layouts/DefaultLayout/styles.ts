import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 80rem;
  height: calc(100vh - 10rem);
  margin: 2rem auto 0;
  padding-inline: 2.5rem;

  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(18, 18, 20, 0.5);
    backdrop-filter: blur(16px);
    padding-block: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    max-width: 100vw;
    padding-inline: 1rem;
    height: calc(100vh - 5rem);
    margin: 2rem 0 0;

    header {
      width: 10rem;
      height: 7.25rem;
      position: fixed;
      top: 0;
      left: 0;
      padding: 1rem;

      display: block;
    }

    main {
      margin-inline: 10rem 0;
    }

    footer {
      width: 10rem;
      top: 7.25rem;
      background-color: rgba(18, 18, 20);
      backdrop-filter: initial;
      padding-block: 1rem;
    }
  }

  @media (min-width: 1600px) {
    main {
      margin-inline: auto;
      max-width: 75rem;
    }
  }
`
