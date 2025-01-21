import { NavLink } from 'react-router-dom'
import { CalendarDots, HouseSimple, Ranking, UsersThree } from '@phosphor-icons/react'
import { NavBarWrapper, NavBarContainer } from './styles'

export function NavBar() {
  return (
    <NavBarWrapper>
      <NavBarContainer>
        <NavLink to="/" title="Página inicial">
          <HouseSimple size={32} />
          <p>Página inicial</p>
        </NavLink>
        <NavLink to="ranking" title="Classificação">
          <Ranking size={32} />
          <p>Classificação</p>
        </NavLink>
        <NavLink to="calendar" title="Jogos">
          <CalendarDots size={32} />
          <p>Jogos</p>
        </NavLink>
        <NavLink to="/teams" title="Equipes">
          <UsersThree size={32} />
          <p>Equipes</p>
        </NavLink>
      </NavBarContainer>
      <p className="copyright">© 2025 Aliança Cup. Todos os direitos reservados.</p>
    </NavBarWrapper>
  )
}
