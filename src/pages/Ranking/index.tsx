import { useEffect, useState } from 'react'
import { RankingContainer, RankingList, History, Legend } from './styles'
import { calculateTeamStats } from '../../utils/calculateTeamStats'
import { sortTeams } from '../../utils/sortTeams'

export function Ranking() {
  const [teams, setTeams] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const teamsData = await fetch('/data/teams.json').then((res) => res.json())
      const matchesData = await fetch('/data/matches.json').then((res) => res.json())

      const calculatedStats = calculateTeamStats(teamsData, matchesData)
      const sorted = sortTeams(calculatedStats, matchesData)
      setTeams(sorted)
      setMatches(matchesData.rounds)
    }

    fetchData()
  }, [])

  return (
    <RankingContainer>
      <h1>Classificação</h1>
      <RankingList>
        <div className="mainTable">
          <table>
            <thead>
              <tr>
                <th>Equipe</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id}>
                  <td className="team">
                    <strong>{index + 1}</strong>
                    <img src={team.logo} alt={team.name} />
                    <p className="nameOnMobile">{team.shortName}</p>
                    <p className="nameOnDesk">{team.name}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <table>
              <thead>
                <tr>
                  <th title="Pontos">P</th>
                  <th title="Jogos">J</th>
                  <th title="Vitórias">V</th>
                  <th title="Derrotas">D</th>
                  <th title="Sets Ganhos">SG</th>
                  <th title="Sets Perdidos">SP</th>
                  <th title="Pontos Feitos">PF</th>
                  <th title="Pontos Sofridos">PS</th>
                  <th title="Média de Sets">MS</th>
                  <th title="Média de Pontos">MP</th>
                  <th>Histórico</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.stats.points}</td>
                    <td>{team.stats.games}</td>
                    <td>{team.stats.wins}</td>
                    <td>{team.stats.losses}</td>
                    <td>{team.stats.setsWon}</td>
                    <td>{team.stats.setsLost}</td>
                    <td>{team.stats.pointsScored}</td>
                    <td>{team.stats.pointsConceded}</td>
                    <td>{(team.stats.setsWon / (team.stats.setsWon + team.stats.setsLost)).toFixed(2)}</td>
                    <td>{(team.stats.pointsScored / team.stats.pointsConceded).toFixed(2)}</td>
                    <td>
                      <ul>
                        {matches
                          .flatMap((round) => round.games)
                          .filter(
                            (game) =>
                              (game.teamA === team.id || game.teamB === team.id) &&
                              game.score &&
                              game.sets &&
                              game.sets.length > 0,
                          )
                          .slice(-5)
                          .reverse()
                          .map((game, index) => {
                            const isWin =
                              (game.teamA === team.id && game.score.teamA > game.score.teamB) ||
                              (game.teamB === team.id && game.score.teamB > game.score.teamA)
                            return <History key={index} gameResultColor={isWin ? 'win' : 'lose'} />
                          })}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Legend>
          <span>P - Pontos</span>
          <span>J - Jogos</span>
          <span>V - Vitórias</span>
          <span>D - Derrotas</span>
          <span>SG - Sets Ganhos</span>
          <span>SP - Sets Perdidos</span>
          <span>PF - Pontos Feitos</span>
          <span>PS - Pontos Sofridos</span>
          <span>MS - Média de Sets</span>
          <span>MP - Média de Pontos</span>
        </Legend>
      </RankingList>
    </RankingContainer>
  )
}
