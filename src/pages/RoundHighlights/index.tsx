import { useEffect, useState } from 'react'
import { PlayerCard } from '../../components/PlayerCard'
import {
  RoundHighlightsContainer,
  Header,
  Main,
  GuidesContainer,
  MainSquad,
} from './styles'
import { CategoryToggleButton } from '../../components/CategoryToggleButton'

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
  'male-players': { playerId: number }[]
  'female-players': { playerId: number }[]
}

export function RoundHighlights() {
  const [rounds, setRounds] = useState<RoundData[]>([])
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null)
  const [players, setPlayers] = useState<PlayerWithTeam[]>([])
  const [selectedCategory, setSelectedCategory] = useState<'male' | 'female'>(
    'male',
  )

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

        const highlightsKey =
          selectedCategory === 'male' ? 'male-players' : 'female-players'
        const selectedPlayersRefs = selectedRound[highlightsKey]

        const selectedPlayers = selectedPlayersRefs
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

              if (team.libero && team.libero.playerId === playerRef.playerId) {
                const libero = team.libero
                return {
                  playerId: libero.playerId,
                  playerName: libero.playerName,
                  playerPosition: libero.playerPosition,
                  playerNumber: libero.playerNumber,
                  playerImage: libero.playerImage,
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
  }, [selectedRoundId, rounds, selectedCategory])

  return (
    <RoundHighlightsContainer>
      <Header>
        <h1>Destaques da rodada</h1>
      </Header>

      <Main>
        <CategoryToggleButton
          variant="default"
          category={selectedCategory}
          onChangeCategory={setSelectedCategory}
        />
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
