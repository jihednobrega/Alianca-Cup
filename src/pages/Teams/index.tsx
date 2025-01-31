import { Link } from 'react-router-dom'
import { TeamsContainer, TeamCard } from './styles'
import { useEffect, useState } from 'react'

export function Teams() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/data/teams.json')
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error('Erro ao carregar os dados das equipes:', error)
      }
    }

    fetchTeams()
  }, [])
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
