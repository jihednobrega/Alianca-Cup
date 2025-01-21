import { HeaderContainer } from './styles'
import alianca from '../../assets/AV-logo-1.png'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()
  return (
    <HeaderContainer onClick={() => navigate('/')}>
      <div>
        <img src={alianca} sizes="" alt="" />
        <span>Aliança Cup</span>
      </div>
    </HeaderContainer>
  )
}
