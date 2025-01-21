import styled from 'styled-components'

export const PlayerCardContainer = styled.div<{ colorPrimary: string }>`
  position: relative;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0px 0px 5px ${(props) => props.colorPrimary || '#ccc'});
`

export const CardBorder = styled.div<{ colorPrimary: string }>`
  position: absolute;
  width: 114px;
  height: 168px;
  background: ${(props) => props.colorPrimary || '#ccc'};
  left: 0;
  top: 0;
  clip-path: polygon(50% 0, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%);
`

export const CardInner = styled.div<{ colorPrimary: string }>`
  background: linear-gradient(179deg, ${(props) => props.colorPrimary || '#ccc'}, #e3a83b 90%);
  /* padding: 0.5rem 0.2rem 0rem; */
  width: 108px;
  max-height: 174px;
  margin-top: 4px;
  margin-left: 3px;
  /* margin-top: 5.8%;
  margin-left: 4%; */
  clip-path: polygon(50% 0, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%);
`

export const CardImage = styled.div`
  height: 90px;
  overflow: hidden;
  display: flex;
  padding-inline: 0.3rem 0.5rem;
  background: repeating-linear-gradient(
    126deg,
    hsla(0, 0%, 100%, 0.219) 0%,
    #ffffff57 1.2%,
    transparent 1.19%,
    transparent 4%,
    transparent 4.1%
  );

  .team {
    flex: 1;
    background: hsla(0, 0%, 0%, 0.82);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 2rem;

    img {
      width: 2rem;
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        font-size: 0.7rem;
        color: ${(props) => props.theme['gray-300']};
      }
    }
  }

  .athlete {
    flex: 1 1 75%;
    padding-top: 10px;

    img {
      width: 120%;
      object-fit: cover;
      object-position: top;
    }
  }
`

export const CardText = styled.div`
  position: relative;
  z-index: -1;
  height: 70px;

  &:before {
    content: '';
    position: absolute;
    background: url('https://i.pinimg.com/originals/80/7d/ce/807dcedf950725fea6b935cdb6ffb4a6.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.45;
    z-index: -1;
  }

  .position {
    display: none;
    font-size: 1rem;
    margin: 0;
    padding: 0.25rem;
    position: relative;

    &:before {
      content: '';
      background: linear-gradient(to right, transparent, black, transparent);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 5%;
    }
  }

  .name {
    font-size: 1.3rem;
    position: relative;
    line-height: 1.5;
    color: ${(props) => props.theme['gray-900']};

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 2px;
      background: ${(props) => props.theme['gray-900']};
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -2px;
      transform: translateX(-50%);
      width: 50%;
      height: 2px;
      background: ${(props) => props.theme['gray-900']};
    }
  }

  .number {
    position: relative;
    padding-top: 0.25rem;

    svg {
      width: 2rem;
      height: 2rem;
    }

    p {
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      z-index: 12;
      font-size: 0.8rem;
    }
  }
`
export const CaptainBadge = styled.span`
  width: 1rem;
  height: 1rem;
  line-height: 0;
  position: absolute;
  top: 5.3rem;
  right: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme['gray-400']};
  background-color: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 999px;
  z-index: 1;
`
