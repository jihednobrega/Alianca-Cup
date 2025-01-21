import { Link } from 'react-router-dom'
import { TeamsContainer, TeamCard } from './styles'
import Aliança from '../../assets/teams/Aliança Volei.png'
import SanMarino from '../../assets/teams/San Marino.png'
import Up from '../../assets/teams/Volei Up.png'
import VoleiNatal from '../../assets/teams/Volei Natal.png'
import GelaVolei from '../../assets/teams/Gela Volei.png'
import União from '../../assets/teams/Volei União.png'

// Dados simulados (você pode substituir por uma API ou JSON)
const teams = [
  {
    id: 1,
    name: 'Aliança Volei',
    logo: Aliança,
  },
  {
    id: 2,
    name: 'San Marino',
    logo: SanMarino,
  },
  {
    id: 3,
    name: 'Volei Up',
    logo: Up,
  },
  {
    id: 4,
    name: 'Volei Natal',
    logo: VoleiNatal,
  },
  {
    id: 5,
    name: 'Gela Volei',
    logo: GelaVolei,
  },
  {
    id: 6,
    name: 'Volei União',
    logo: União,
  },
]

export function Teams() {
  return (
    <TeamsContainer>
      <h1>Equipes Participantes</h1>
      <div className="teams-list">
        {teams.map((team) => (
          <TeamCard key={team.id}>
            <Link to={`/teams/${team.id}`}>
              <img src={team.logo} alt={`Logo do ${team.name}`} />
            </Link>
          </TeamCard>
        ))}
      </div>
    </TeamsContainer>
  )
}
