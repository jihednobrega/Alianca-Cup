import styled from 'styled-components'

export const ToggleButtonContainer = styled.div<{
  variant: 'default' | 'small'
  selectedCategory: 'male' | 'female'
}>`
  border: ${(props) =>
    props.variant === 'default'
      ? `2px solid ${
          props.selectedCategory === 'male'
            ? props.theme['blue-500']
            : '#f472b6'
        }`
      : 'none'};
  border-radius: ${(props) =>
    props.variant === 'default' ? '0.8rem' : '0.5rem'};
  position: relative;
  display: flex;
  align-items: center;
  height: ${(props) => (props.variant === 'default' ? '3.125rem' : '2.5rem')};
  max-width: ${(props) => (props.variant === 'default' ? '20rem' : '10rem')};
  width: 100%;
  align-self: ${(props) => (props.variant === 'default' ? 'center' : 'end')};
  margin-top: 1rem;
  margin-bottom: ${(props) =>
    props.variant === 'default' ? 'initial' : '-2rem'};
  overflow: hidden;

  background-color: ${(props) =>
    props.variant === 'default'
      ? `${props.theme['gray-700']}`
      : `${props.theme['gray-600']}`};

  & input {
    display: none;
  }

  & label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all 0.5s;
    font-weight: 500;
    font-size: ${(props) => (props.variant === 'default' ? '1rem' : '0.8rem')};
  }

  & span.background {
    position: absolute;
    width: ${(props) => (props.variant === 'default' ? '49%' : '50%')};
    height: ${(props) =>
      props.variant === 'default' ? 'calc(3.125rem - 0.75rem)' : '100%'};
    background-color: ${(props) => props.theme['blue-500']};
    top: ${(props) => (props.variant === 'default' ? '0.25rem' : '0')};
    left: ${(props) => (props.variant === 'default' ? '0.25rem' : '0')};
    border-radius: ${(props) =>
      props.variant === 'default' ? '0.5rem' : 'none'};
    transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  #female:checked ~ .background {
    background-color: #f472b6;
    left: 50%;
  }

  #male:checked + label[for='male'] {
    color: ${(props) => props.theme['gray-800']};
    font-weight: bold;
  }

  #female:checked + label[for='female'] {
    color: ${(props) => props.theme['gray-800']};
    font-weight: bold;
  }

  #male:not(:checked) + label[for='male'] {
    color: ${(props) => props.theme['blue-300']};
  }

  #female:not(:checked) + label[for='female'] {
    color: #f9a8d4;
  }

  @media (max-width: 375px) {
    width: 70%;
    height: 2rem;

    & span.background {
      height: ${(props) =>
        props.variant === 'default' ? 'calc(2rem - 0.75rem)' : '100%'};
    }
  }
`
