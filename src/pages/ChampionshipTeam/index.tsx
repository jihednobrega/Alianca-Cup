import { useEffect, useRef, useState } from 'react'
import { PlayerCard } from '../../components/PlayerCard'
import { ArrowsClockwise, CaretDown, CaretUp } from '@phosphor-icons/react'
import {
  ChampionshipTeamContainer,
  Header,
  Main,
  GuidesContainer,
  MainSquad,
  LiberoButton,
} from './styles'

type Player = {
  playerName: string
  playerPosition: string
  playerNumber: string
  playerImage: string
  isTeamCaptain?: boolean
}

type Libero = Player & {
  substitutes: number[]
}

type Team = {
  id: number
  name: string
  logo: string
  colorPrimary: string
  players: (Player | string)[]
  libero?: Libero
}

export function ChampionshipTeam() {
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [teams, setTeams] = useState<any[]>([])
  const [team, setTeam] = useState<Team | null>(null)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [rotatingCards, setRotatingCards] = useState<number[]>([])
  const [liberoSubstituted, setLiberoSubstituted] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'subs' | null>(null)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const data: Team[] = await fetch('/data/championship-team.json').then(
          (res) => res.json(),
        )

        const championshipTeam = data[0]

        setTeams(data)
        setTeam(championshipTeam || null)

        if (championshipTeam?.libero?.substitutes) {
          setLiberoSubstituted(championshipTeam.libero.substitutes)
        }
      } catch (error) {
        console.error('Erro ao carregar os times:', error)
      }
    }

    fetchTeam()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isContentVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsContentVisible(false)
        setActiveTab(null)
      }
    }

    if (isContentVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isContentVisible])

  if (!team && teams.length === 0) {
    return <p>Carregando times...</p>
  }

  if (!team) {
    return <p>Time ou jogadores não encontrados!</p>
  }

  if (!team) {
    alert('Time não encontrado!')
    return null
  }

  const players = team.players.filter(
    (player): player is Player => typeof player === 'object',
  )
  const mainPlayers = players.slice(0, 6)
  const subsPlayers = players.slice(6)

  const handleLiberoToggle = (index: number) => {
    setLiberoSubstituted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  const handleFlip = (index: number) => {
    setRotatingCards((prev) => [...prev, index])

    setTimeout(() => {
      setRotatingCards((prev) => prev.filter((i) => i !== index))
      handleLiberoToggle(index)
    }, 300)
  }

  const toggleTab = (tab: 'subs') => {
    if (activeTab === tab) {
      setIsContentVisible(false)
      setActiveTab(null)
    } else {
      setIsContentVisible(true)
      setActiveTab(tab)
    }
  }

  return (
    <ChampionshipTeamContainer>
      <Header>
        <h1>Seleção do campeonato</h1>
      </Header>
      <Main>
        <MainSquad>
          {mainPlayers.map((player, index) => {
            const isSubstitutedByLibero = liberoSubstituted.includes(index)
            const displayedPlayer = isSubstitutedByLibero
              ? team.libero || player
              : player
            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  transform: rotatingCards.includes(index)
                    ? 'rotateY(90deg)'
                    : 'rotateY(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <div key={index}>
                  <PlayerCard
                    teamName={team.name}
                    teamLogo={team.logo}
                    colorPrimary={team.colorPrimary}
                    playerName={displayedPlayer.playerName}
                    playerPosition={displayedPlayer.playerPosition}
                    playerNumber={displayedPlayer.playerNumber}
                    playerImage={displayedPlayer.playerImage}
                    isTeamCaptain={displayedPlayer.isTeamCaptain || false}
                  />
                </div>

                {team.libero && team.libero.substitutes.includes(index) && (
                  <LiberoButton onClick={() => handleFlip(index)}>
                    <ArrowsClockwise size={16} />
                  </LiberoButton>
                )}
              </div>
            )
          })}
        </MainSquad>
        <GuidesContainer isOpen={!!activeTab} ref={menuRef}>
          <div className="buttons">
            <button
              onClick={() => toggleTab('subs')}
              className={activeTab === 'subs' ? 'active' : ''}
            >
              Subs
              {activeTab === 'subs' ? (
                <CaretDown size={24} />
              ) : (
                <CaretUp size={24} />
              )}
            </button>
          </div>
          <div
            className={`subsContent ${activeTab === 'subs' && isContentVisible ? 'open' : ''}`}
          >
            {activeTab === 'subs' &&
              subsPlayers.map((player, index) =>
                typeof player === 'object' ? (
                  <PlayerCard
                    key={index}
                    teamName={team.name}
                    teamLogo={team.logo}
                    colorPrimary={team.colorPrimary}
                    playerName={player.playerName}
                    playerPosition={player.playerPosition}
                    playerNumber={player.playerNumber}
                    playerImage={player.playerImage}
                    isTeamCaptain={player.isTeamCaptain}
                  />
                ) : (
                  <div key={index}>
                    <p>{player}</p>
                  </div>
                ),
              )}
          </div>
        </GuidesContainer>
      </Main>
      <div className="desk-subs-content">
        {subsPlayers.map((player, index) =>
          typeof player === 'object' ? (
            <PlayerCard
              key={index}
              teamName={team.name}
              teamLogo={team.logo}
              colorPrimary={team.colorPrimary}
              playerName={player.playerName}
              playerPosition={player.playerPosition}
              playerNumber={player.playerNumber}
              playerImage={player.playerImage}
              isTeamCaptain={player.isTeamCaptain}
            />
          ) : (
            <div key={index}>
              <p>{player}</p>
            </div>
          ),
        )}
      </div>
    </ChampionshipTeamContainer>
  )
}
