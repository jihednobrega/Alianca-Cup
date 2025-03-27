import { useEffect, useState } from 'react'
import {
  ScheduleContainer,
  MonthSection,
  RoundHeader,
  GameCard,
} from './styles'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface Team {
  id: number
  name: string
  logo: string
}

interface Game {
  id: number
  teamA: number
  teamB: number
  time: string
  category: string
  score?: { teamA: number; teamB: number }
  sets?: string[]
}

interface Round {
  round: number | string
  date: string
  games: Game[]
}

interface GroupedMonth {
  month: string
  rounds: Round[]
}

export function Schedule() {
  const [teams, setTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<GroupedMonth[]>([])
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await fetch('/data/teams.json').then((res) =>
          res.json(),
        )
        const matchesData = await fetch('/data/matches.json').then((res) =>
          res.json(),
        )

        setTeams(teamsData)

        const groupedMonths: GroupedMonth[] = matchesData.rounds.reduce(
          (acc: GroupedMonth[], round: Round) => {
            const matchDate = new Date(round.date)
            const monthName = matchDate.toLocaleString('pt-BR', {
              month: 'long',
            })
            const formattedMonth =
              monthName.charAt(0).toUpperCase() + monthName.slice(1)

            let month = acc.find((m) => m.month === formattedMonth)
            if (!month) {
              month = { month: formattedMonth, rounds: [] }
              acc.push(month)
            }

            month.rounds.push(round)
            return acc
          },
          [],
        )

        setMatches(groupedMonths)

        let nextMonthIndex = 0
        let foundNextRound = false

        for (let i = 0; i < groupedMonths.length; i++) {
          const month = groupedMonths[i]
          for (const round of month.rounds) {
            if (
              round.games.some(
                (game: Game) => !game.score || !game.sets?.length,
              )
            ) {
              nextMonthIndex = i
              foundNextRound = true
              break
            }
          }
          if (foundNextRound) break
        }

        setSelectedMonthIndex(nextMonthIndex)
      } catch (error) {
        console.error('Erro ao carregar os dados:', error)
      }
    }

    fetchData()
  }, [])

  const handlePreviousMonth = () => {
    if (selectedMonthIndex > 0) setSelectedMonthIndex((prev) => prev - 1)
  }

  const handleNextMonth = () => {
    if (selectedMonthIndex < matches.length - 1)
      setSelectedMonthIndex((prev) => prev + 1)
  }

  function getTeamById(teamId: number): Team | undefined {
    return teams.find((team) => team.id === teamId)
  }

  const currentMonth = matches[selectedMonthIndex]

  return (
    <ScheduleContainer>
      {currentMonth && (
        <>
          <RoundHeader>
            <button
              onClick={handlePreviousMonth}
              disabled={selectedMonthIndex === 0}
            >
              <CaretLeft size={24} weight="bold" />
            </button>
            <h1>{currentMonth.month}</h1>
            <button
              onClick={handleNextMonth}
              disabled={selectedMonthIndex === matches.length - 1}
            >
              <CaretRight size={24} weight="bold" />
            </button>
          </RoundHeader>

          {currentMonth.rounds.map((round: Round) => (
            <MonthSection key={round.round}>
              <div className="games-list-wrapper">
                <h2>
                  {typeof round.round === 'string'
                    ? round.round
                    : `${round.round}ª Rodada`}{' '}
                  (
                  {new Date(`${round.date}T00:00:00`).toLocaleDateString(
                    'pt-BR',
                  )}
                  )
                </h2>
                <div className="games-list">
                  {round.games.map((game: Game) => {
                    const teamA =
                      typeof game.teamA === 'string'
                        ? { name: game.teamA, logo: '' }
                        : getTeamById(game.teamA)
                    const teamB =
                      typeof game.teamB === 'string'
                        ? { name: game.teamB, logo: '' }
                        : getTeamById(game.teamB)

                    return (
                      <GameCard key={game.id}>
                        <div>
                          <span className="localAndTime">
                            <span
                              style={{
                                color:
                                  game.category === 'Masculino'
                                    ? '#7dd3fc'
                                    : '#f9a8d4',
                              }}
                            >
                              {' '}
                              {game.category}{' '}
                            </span>{' '}
                            - Edgar Barbosa -{' '}
                            {game.time || 'Horário indefinido'}
                          </span>
                        </div>
                        <div className="matchResult">
                          <div className="team">
                            {teamA?.logo && (
                              <img src={teamA.logo} alt={teamA.name} />
                            )}
                            <p>{teamA?.name || 'Indefinido'}</p>
                          </div>
                          {game.score?.teamA !== undefined &&
                          game.score?.teamB !== undefined &&
                          game.sets?.length ? (
                            <>
                              <p>{game.score.teamA}</p>
                              <p className="versus">x</p>
                              <p>{game.score.teamB}</p>
                            </>
                          ) : (
                            <p className="versus">vs</p>
                          )}
                          <div className="team">
                            {teamB?.logo && (
                              <img src={teamB.logo} alt={teamB.name} />
                            )}
                            <p>{teamB?.name || 'Indefinido'}</p>
                          </div>
                        </div>
                        {game.sets && game.sets.length > 0 && (
                          <div className="score">
                            <p>{game.sets.join(' | ')}</p>
                          </div>
                        )}
                      </GameCard>
                    )
                  })}
                </div>
              </div>
            </MonthSection>
          ))}
        </>
      )}
    </ScheduleContainer>
  )
}
