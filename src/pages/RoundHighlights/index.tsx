// import { useEffect, useRef, useState } from 'react'
// import { PlayerCard } from '../../components/PlayerCard'
// import { ArrowsClockwise, CaretDown, CaretUp } from '@phosphor-icons/react'
// import {
//   RoundHighlightsContainer,
//   Header,
//   Main,
//   GuidesContainer,
//   MainSquad,
//   PlayerToggleButton,
// } from './styles'

// type Player = {
//   playerId: number
//   playerName: string
//   playerPosition: string
//   playerNumber: string
//   playerImage: string
//   isTeamCaptain?: boolean
// }

// type Team = {
//   id: number
//   name: string
//   logo: string
//   colorPrimary: string
//   players: Player[]
// }

// type RoundData = {
//   roundId: number
//   roundName: string
//   players: { playerId: number }[]
//   libero: { playerId: number }
// }

// export function RoundHighlights() {
//   const [activeTab, setActiveTab] = useState<
//     | 'first-round'
//     | 'second-round'
//     | 'third-round'
//     | 'fourth-round'
//     | 'fifth-round'
//     | null
//   >('first-round')

//   const toggleTab = (
//     tab:
//       | 'first-round'
//       | 'second-round'
//       | 'third-round'
//       | 'fourth-round'
//       | 'fifth-round',
//   ) => {
//     setActiveTab(tab)
//   }
//   return (
//     <RoundHighlightsContainer>
//       <Header>
//         <h1>Destaques da rodada</h1>
//       </Header>

//       <Main>
//         <MainSquad></MainSquad>
//         <GuidesContainer>
//           <div className="buttons">
//             <button
//               onClick={() => toggleTab('first-round')}
//               className={activeTab === 'first-round' ? 'active' : ''}
//             >
//               1º rodada
//             </button>

//             <button
//               onClick={() => toggleTab('second-round')}
//               className={activeTab === 'second-round' ? 'active' : ''}
//             >
//               2º rodada
//             </button>

//             <button
//               onClick={() => toggleTab('third-round')}
//               className={activeTab === 'third-round' ? 'active' : ''}
//             >
//               3º rodada
//             </button>

//             <button
//               onClick={() => toggleTab('fourth-round')}
//               className={activeTab === 'fourth-round' ? 'active' : ''}
//             >
//               4º rodada
//             </button>

//             <button
//               onClick={() => toggleTab('fifth-round')}
//               className={activeTab === 'fifth-round' ? 'active' : ''}
//             >
//               5º rodada
//             </button>
//           </div>
//         </GuidesContainer>
//       </Main>
//       <div className="desk-content">
//         <div className="buttons">
//           <button
//             onClick={() => toggleTab('first-round')}
//             className={activeTab === 'first-round' ? 'active' : ''}
//           >
//             1º rodada
//           </button>

//           <button
//             onClick={() => toggleTab('second-round')}
//             className={activeTab === 'second-round' ? 'active' : ''}
//           >
//             2º rodada
//           </button>

//           <button
//             onClick={() => toggleTab('third-round')}
//             className={activeTab === 'third-round' ? 'active' : ''}
//           >
//             3º rodada
//           </button>

//           <button
//             onClick={() => toggleTab('fourth-round')}
//             className={activeTab === 'fourth-round' ? 'active' : ''}
//           >
//             4º rodada
//           </button>

//           <button
//             onClick={() => toggleTab('fifth-round')}
//             className={activeTab === 'fifth-round' ? 'active' : ''}
//           >
//             5º rodada
//           </button>
//         </div>
//       </div>
//     </RoundHighlightsContainer>
//   )
// }

import { useEffect, useState } from 'react'
import { PlayerCard } from '../../components/PlayerCard'
import {
  RoundHighlightsContainer,
  Header,
  Main,
  GuidesContainer,
  MainSquad,
} from './styles'

type Player = {
  playerId: number
  playerName: string
  playerPosition: string
  playerNumber: string
  playerImage: string
}

type PlayerWithTeam = Player & {
  teamName: string
  teamLogo: string
  colorPrimary: string
}

type RoundData = {
  roundId: number
  roundName: string
  players: { playerId: number }[]
  libero: { playerId: number }
}

export function RoundHighlights() {
  const [rounds, setRounds] = useState<RoundData[]>([])
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null)
  const [players, setPlayers] = useState<PlayerWithTeam[]>([])

  useEffect(() => {
    async function fetchRounds() {
      try {
        const roundsData: RoundData[] = await fetch(
          '/data/round-highlights.json',
        ).then((res) => res.json())

        const sortedRounds = [...roundsData].sort(
          (a, b) => b.roundId - a.roundId,
        )
        setRounds(sortedRounds)

        if (roundsData.length > 0) {
          setSelectedRoundId(sortedRounds[0].roundId)
        }
      } catch (error) {
        console.error('Erro ao carregar as rodadas:', error)
      }
    }

    fetchRounds()
  }, [])

  useEffect(() => {
    async function fetchPlayers() {
      try {
        if (!selectedRoundId || rounds.length === 0) return

        const selectedRound = rounds.find(
          (round) => round.roundId === selectedRoundId,
        )
        if (!selectedRound) {
          console.error('Rodada não encontrada!')
          return
        }

        const teamsData = await fetch('/data/teams.json').then((res) =>
          res.json(),
        )
        const selectedPlayers = selectedRound.players
          .map((playerRef) => {
            for (const team of teamsData) {
              const foundPlayer = team.players.find(
                (player: Player) => player.playerId === playerRef.playerId,
              )
              if (foundPlayer) {
                return {
                  ...foundPlayer,
                  teamName: team.name,
                  teamLogo: team.logo,
                  colorPrimary: team.colorPrimary,
                } as PlayerWithTeam
              }
            }
            console.warn(
              `Jogador com playerId=${playerRef.playerId} não encontrado!`,
            )
            return null
          })
          .filter((player): player is PlayerWithTeam => player !== null)

        setPlayers(selectedPlayers)
      } catch (error) {
        console.error('Erro ao carregar os jogadores:', error)
      }
    }

    fetchPlayers()
  }, [selectedRoundId, rounds])

  return (
    <RoundHighlightsContainer>
      <Header>
        <h1>Destaques da rodada</h1>
      </Header>

      <Main>
        <MainSquad>
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              teamName={player.teamName}
              teamLogo={player.teamLogo}
              colorPrimary={player.colorPrimary}
              playerName={player.playerName}
              playerPosition={player.playerPosition}
              playerNumber={player.playerNumber}
              playerImage={player.playerImage}
            />
          ))}
        </MainSquad>
        <GuidesContainer>
          <RoundSelector
            rounds={rounds}
            selectedRoundId={selectedRoundId}
            setSelectedRoundId={setSelectedRoundId}
          />
        </GuidesContainer>
      </Main>
      <div className="desk-content">
        <RoundSelector
          rounds={rounds}
          selectedRoundId={selectedRoundId}
          setSelectedRoundId={setSelectedRoundId}
        />
      </div>
    </RoundHighlightsContainer>
  )

  type RoundSelectorProps = {
    rounds: RoundData[]
    selectedRoundId: number | null
    setSelectedRoundId: (id: number) => void
  }

  function RoundSelector({
    rounds,
    selectedRoundId,
    setSelectedRoundId,
  }: RoundSelectorProps) {
    return (
      <div className="buttons">
        {rounds.map((round) => (
          <button
            key={round.roundId}
            onClick={() => setSelectedRoundId(round.roundId)}
            className={selectedRoundId === round.roundId ? 'active' : ''}
          >
            {round.roundName}
          </button>
        ))}
      </div>
    )
  }
}
