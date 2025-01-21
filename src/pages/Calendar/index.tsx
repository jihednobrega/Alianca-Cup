import { useState } from 'react'
import { CalendarContainer, MonthSection, RoundHeader, GameCard } from './styles'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import Aliança from '../../assets/teams/Aliança Volei.png'
import SanMarino from '../../assets/teams/San Marino.png'
import Up from '../../assets/teams/Volei Up.png'
import VoleiNatal from '../../assets/teams/Volei Natal.png'
import GelaVolei from '../../assets/teams/Gela Volei.png'
import União from '../../assets/teams/Volei União.png'

type Game = {
  id: number
  time: string
  teamA: string
  teamAImage?: string
  teamB: string
  teamBImage?: string
  score?: { teamA: number; teamB: number }
  sets?: string[]
}

const calendarData: {
  month: string
  rounds: {
    id: number
    name: string
    date: string
    games: Game[]
  }[]
}[] = [
  {
    month: 'Fevereiro',
    rounds: [
      {
        id: 1,
        name: '1ª Rodada',
        date: '16/02/2024',
        games: [
          {
            id: 1,
            time: '16:00',
            teamA: 'Aliança',
            teamAImage: Aliança,
            teamB: 'San Marino',
            teamBImage: SanMarino,
            score: { teamA: 2, teamB: 0 },
            sets: ['25-20', '25-22'],
          },
          {
            id: 2,
            time: '18:00',
            teamA: 'União',
            teamAImage: União,
            teamB: 'Gela Vôlei',
            teamBImage: GelaVolei,
            score: { teamA: 1, teamB: 2 },
            sets: ['25-20', '19-25', '13-15'],
          },
          {
            id: 3,
            time: '20:00',
            teamA: 'Vôlei Up',
            teamAImage: Up,
            teamB: 'Vôlei Natal',
            teamBImage: VoleiNatal,
            score: { teamA: 2, teamB: 1 },
            sets: ['25-21', '23-25', '15-10'],
          },
        ],
      },
    ],
  },
  {
    month: 'Março',
    rounds: [
      {
        id: 2,
        name: '2ª Rodada',
        date: '09/03/2024',
        games: [
          {
            id: 1,
            time: '16:00',
            teamA: 'Gela Vôlei',
            teamAImage: GelaVolei,
            teamB: 'Vôlei Natal',
            teamBImage: VoleiNatal,
          },
          {
            id: 2,
            time: '18:00',
            teamA: 'Vôlei Up',
            teamAImage: Up,
            teamB: 'San Marino',
            teamBImage: SanMarino,
          },
          {
            id: 3,
            time: '20:00',
            teamA: 'Aliança',
            teamAImage: Aliança,
            teamB: 'União',
            teamBImage: União,
          },
        ],
      },
      {
        id: 3,
        name: '3ª Rodada',
        date: '23/03/2024',
        games: [
          {
            id: 1,
            time: '16:00',
            teamA: 'Aliança',
            teamAImage: Aliança,
            teamB: 'Gela Vôlei',
            teamBImage: GelaVolei,
          },
          {
            id: 2,
            time: '18:00',
            teamA: 'Vôlei Natal',
            teamAImage: VoleiNatal,
            teamB: 'San Marino',
            teamBImage: SanMarino,
          },
          {
            id: 3,
            time: '20:00',
            teamA: 'Vôlei Up',
            teamAImage: Up,
            teamB: 'União',
            teamBImage: União,
          },
        ],
      },
    ],
  },
  {
    month: 'Abril',
    rounds: [
      {
        id: 4,
        name: '4ª Rodada',
        date: '06/04/2024',
        games: [
          {
            id: 1,
            time: '16:00',
            teamA: 'União',
            teamAImage: União,
            teamB: 'Vôlei Natal',
            teamBImage: VoleiNatal,
          },
          {
            id: 2,
            time: '18:00',
            teamA: 'Aliança',
            teamAImage: Aliança,
            teamB: 'Vôlei Up',
            teamBImage: Up,
          },
          {
            id: 3,
            time: '20:00',
            teamA: 'San Marino',
            teamAImage: SanMarino,
            teamB: 'Gela Vôlei',
            teamBImage: GelaVolei,
          },
        ],
      },
      {
        id: 5,
        name: '5ª Rodada',
        date: '20/04/2024',
        games: [
          {
            id: 1,
            time: '16:00',
            teamA: 'Gela Vôlei',
            teamAImage: GelaVolei,
            teamB: 'Vôlei Up',
            teamBImage: Up,
          },
          {
            id: 2,
            time: '18:00',
            teamA: 'União',
            teamAImage: União,
            teamB: 'San Marino',
            teamBImage: SanMarino,
          },
          {
            id: 3,
            time: '20:00',
            teamA: 'Aliança',
            teamAImage: Aliança,
            teamB: 'Vôlei Natal',
            teamBImage: VoleiNatal,
          },
        ],
      },
    ],
  },
  {
    month: 'Maio',
    rounds: [
      {
        id: 6,
        date: '04/05/2024',
        name: 'Disputa de 3º',
        games: [{ id: 1, time: '16:00', teamA: '3º Fase de grupos', teamB: '4º Fase de grupos' }],
      },
      {
        id: 7,
        date: '04/05/2024',
        name: 'Final',
        games: [{ id: 1, time: '18:00', teamA: '1º Fase de grupos', teamB: '2º Fase de grupos' }],
      },
    ],
  },
]

export function Calendar() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)

  const currentMonth = calendarData[selectedMonthIndex]

  const handlePreviousMonth = () => {
    if (selectedMonthIndex > 0) setSelectedMonthIndex((prev) => prev - 1)
  }

  const handleNextMonth = () => {
    if (selectedMonthIndex < calendarData.length - 1) setSelectedMonthIndex((prev) => prev + 1)
  }

  return (
    <CalendarContainer>
      <RoundHeader>
        <button onClick={handlePreviousMonth} disabled={selectedMonthIndex === 0}>
          <CaretLeft size={24} weight="bold" />
        </button>
        <h1>{currentMonth.month}</h1>
        <button onClick={handleNextMonth} disabled={selectedMonthIndex === calendarData.length - 1}>
          <CaretRight size={24} weight="bold" />
        </button>
      </RoundHeader>

      {currentMonth.rounds.map((round) => (
        <MonthSection key={round.id}>
          <div className="games-list-wrapper">
            <h2>
              {round.name} ({round.date})
            </h2>
            <div className="games-list">
              {round.games.map((game) => (
                <GameCard key={game.id}>
                  <div>
                    <span className="localAndTime">Edgar Barbosa - {game.time}</span>
                  </div>
                  <div className="matchResult">
                    <div className="team">
                      <img src={game.teamAImage} />
                      <p>{game.teamA}</p>
                    </div>
                    {game.score && game.sets && <p>{game.score.teamA}</p>}
                    {game.score && game.sets && <p className="versus">x</p>}
                    {!(game.score || game.sets) && <p className="versus">vs</p>}

                    {game.score && game.sets && <p>{game.score.teamB}</p>}
                    <div className="team">
                      <img src={game.teamBImage} />
                      <p>{game.teamB}</p>
                    </div>
                  </div>
                  {game.score && game.sets && (
                    <div className="score">
                      <p>{game.sets.join(' | ')}</p>
                    </div>
                  )}
                </GameCard>
              ))}
            </div>
          </div>
        </MonthSection>
      ))}
    </CalendarContainer>
  )
}
