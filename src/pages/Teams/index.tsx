import { Link } from 'react-router-dom'
import { TeamsContainer, TeamCard } from './styles'
import { useEffect, useState } from 'react'

export function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [maleTeams, setMaleTeams] = useState<any[]>([])
  const [femaleTeams, setFemaleTeams] = useState<any[]>([])

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teamsData = await fetch('/data/teams.json').then((res) =>
          res.json(),
        )

        const maleTeamsData = teamsData.filter(
          (team: any) => team.category === 'Masculino',
        )
        const femaleTeamsData = teamsData.filter(
          (team: any) => team.category === 'Feminino',
        )

        setTeams(teamsData)
        setMaleTeams(maleTeamsData)
        setFemaleTeams(femaleTeamsData)
      } catch (error) {
        console.error('Erro ao carregar os dados das equipes:', error)
      }
    }

    fetchTeams()
  }, [])
  return (
    <TeamsContainer>
      <h1>Equipes Participantes</h1>

      <h2>Masculino</h2>
      <div className="teams-list">
        {maleTeams.map((team) => (
          <TeamCard key={team.id}>
            <Link to={`/teams/${team.id}`}>
              <img src={team.logo} alt={`Logo do ${team.name}`} />
            </Link>
          </TeamCard>
        ))}
      </div>

      <h2>Feminino</h2>
      <div className="teams-list">
        {femaleTeams.map((team) => (
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
