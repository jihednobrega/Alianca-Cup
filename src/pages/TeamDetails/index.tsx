import { useEffect, useRef, useState } from 'react'
import { PlayerCard } from '../../components/PlayerCard'
import { useParams, useNavigate } from 'react-router-dom'
import { calculateTeamStats } from '../../utils/calculateTeamStats'
import {
  ArrowsClockwise,
  CaretDown,
  CaretLeft,
  CaretUp,
} from '@phosphor-icons/react'
import {
  TeamDetailsContainer,
  Header,
  Main,
  GuidesContainer,
  MainSquad,
  LiberoButton,
} from './styles'
import { sortTeams } from '../../utils/sortTeams'

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

type Match = {
  id: number
  teamA: number
  teamB: number
  score: {
    teamA: number
    teamB: number
  }
  sets: string[]
}

type Round = {
  games: Match[]
}

export function TeamDetails() {
  const navigate = useNavigate()
  const { teamId } = useParams<{ teamId: string }>()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [teams, setTeams] = useState<any[]>([])
  const [team, setTeam] = useState<Team | null>(null)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [rotatingCards, setRotatingCards] = useState<number[]>([])
  const [liberoSubstituted, setLiberoSubstituted] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'subs' | 'stats' | null>(null)
  const [activeStatsContent, setActiveStatsContent] = useState<
    'default' | 'highlights' | 'recentGames'
  >('default')
  const [teamPosition, setTeamPosition] = useState<number | null>(null)
  const [teamStats, setTeamStats] = useState<any | null>(null)
  const [totalTeams, setTotalTeams] = useState<number>(0)
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await fetch('/data/teams.json').then((res) =>
          res.json(),
        )
        const matchesData = await fetch('/data/matches.json').then((res) =>
          res.json(),
        )

        // 🔥 Encontrar o time selecionado
        const selectedTeam = teamsData.find(
          (team: any) => team.id === Number(teamId),
        )
        if (!selectedTeam) {
          console.error('Time não encontrado!')
          setTeam(null)
          return
        }

        // 🔥 Filtrar os times da mesma categoria do time selecionado
        const filteredTeams = teamsData.filter(
          (team: any) => team.category === selectedTeam.category,
        )

        // 🔥 Transformar os jogos em uma lista plana
        const allGames = matchesData.rounds
          .flatMap((round: Round) => round.games)
          .filter((game: any) => game !== undefined)

        const formattedMatchesData = {
          rounds: [{ round: 1, date: '2025-03-01', games: allGames }],
        }

        if (filteredTeams.length >= 8) {
          // 🔥 Dividir os times em grupos
          const half = Math.ceil(filteredTeams.length / 2)
          const groupA = filteredTeams.slice(0, half)
          const groupB = filteredTeams.slice(half)

          // 🔥 Calcular estatísticas separadamente para cada grupo
          const statsGroupA = calculateTeamStats(groupA, formattedMatchesData)
          const statsGroupB = calculateTeamStats(groupB, formattedMatchesData)

          // 🔥 Ordenar os grupos individualmente
          const sortedGroupA = sortTeams(statsGroupA, allGames)
          const sortedGroupB = sortTeams(statsGroupB, allGames)

          // 🔥 Encontrar o time no grupo correto e definir a posição
          let teamInGroupA = sortedGroupA.find(
            (team: any) => team.id === Number(teamId),
          )
          let teamInGroupB = sortedGroupB.find(
            (team: any) => team.id === Number(teamId),
          )

          if (teamInGroupA) {
            setTeamStats(teamInGroupA)
            setTeamPosition(
              sortedGroupA.findIndex(
                (team: any) => team.id === Number(teamId),
              ) + 1,
            )
            setTotalTeams(sortedGroupA.length)
          } else if (teamInGroupB) {
            setTeamStats(teamInGroupB)
            setTeamPosition(
              sortedGroupB.findIndex(
                (team: any) => team.id === Number(teamId),
              ) + 1,
            )
            setTotalTeams(sortedGroupB.length)
          } else {
            setTeamStats(null)
          }
        } else {
          // 🔥 Calcular estatísticas para grupo único
          const calculatedStats = calculateTeamStats(
            filteredTeams,
            formattedMatchesData,
          )
          const sortedTeams = sortTeams(calculatedStats, allGames)

          const selectedTeamStats = sortedTeams.find(
            (team: any) => team.id === Number(teamId),
          )

          if (selectedTeamStats) {
            setTeamStats(selectedTeamStats)
            setTeamPosition(
              sortedTeams.findIndex((team: any) => team.id === Number(teamId)) +
                1,
            )
            setTotalTeams(sortedTeams.length)
          } else {
            setTeamStats(null)
          }
        }

        setTeams(teamsData)
        setMatches(allGames)
      } catch (error) {
        console.error('Erro ao carregar as estatísticas:', error)
      }
    }

    async function fetchTeams() {
      try {
        const data: Team[] = await fetch('/data/teams.json').then((res) =>
          res.json(),
        )
        const selectedTeam = data.find((team) => team.id === Number(teamId))

        setTeams(data)
        setTeam(selectedTeam || null)

        if (selectedTeam?.libero?.substitutes) {
          setLiberoSubstituted(selectedTeam.libero.substitutes)
        }
      } catch (error) {
        console.error('Erro ao carregar os times:', error)
      }
    }

    fetchData()
    fetchTeams()
  }, [teamId])

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

  if (!team && teams.length > 0) {
    return <p>Time ou jogadores não encontrados!</p>
  }

  if (!team) {
    alert('Time não encontrado!')
    return null
  }

  const lastGames = matches
    .filter(
      (game) => game.teamA === teamStats?.id || game.teamB === teamStats?.id,
    )
    .filter((game) => game.score && game.sets && game.sets.length > 0)
    .slice(-3)
    .reverse()

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

  const toggleTab = (tab: 'subs' | 'stats') => {
    if (activeTab === tab) {
      setIsContentVisible(false)
      setActiveTab(null)
    } else {
      setIsContentVisible(true)
      setActiveTab(tab)
    }
  }

  return (
    <TeamDetailsContainer>
      <Header>
        <CaretLeft size={32} onClick={() => navigate(-1)} />
        <h1 onClick={() => navigate(-1)}>{team.name}</h1>
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
                    playerImage={
                      displayedPlayer.playerImage ||
                      '/assets/players/default-player-man.png'
                    }
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
            <button
              onClick={() => toggleTab('stats')}
              className={activeTab === 'stats' ? 'active' : ''}
            >
              {activeTab === 'stats' ? (
                <CaretDown size={24} />
              ) : (
                <CaretUp size={24} />
              )}
              Stats
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
          <div
            className={`statsContent ${activeTab === 'stats' && isContentVisible ? 'open' : ''}`}
          >
            {activeTab === 'stats' && (
              <div className="stats">
                {activeStatsContent === 'default' && (
                  <div className="team-stats">
                    <div>
                      <h3>Posição</h3>
                      <div className="stat-content">
                        <p>{teamPosition}º</p>
                        <div className="bar"></div>
                        <p>{totalTeams.toString()}</p>
                      </div>
                    </div>
                    <div className="overall">
                      <h3>Desempenho Geral</h3>
                      <div className="stat-content">
                        <p>
                          Pontos: <strong>{teamStats.stats.points}</strong>
                        </p>
                        <p>
                          Vitórias: <strong>{teamStats.stats.wins} </strong>/{' '}
                          {teamStats.stats.wins + teamStats.stats.losses}
                        </p>
                        <p>
                          Sets Vencidos:{' '}
                          <strong>{teamStats.stats.setsWon} </strong>/{' '}
                          {teamStats.stats.setsWon + teamStats.stats.setsLost}
                        </p>
                        <p>
                          Pontos Feitos:{' '}
                          <strong>{teamStats.stats.pointsScored}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveStatsContent('recentGames')}
                    >
                      <h3>Últimos Jogos</h3>
                    </button>
                  </div>
                )}
                {activeStatsContent === 'recentGames' && (
                  <div>
                    <div className="statsHeader">
                      <button onClick={() => setActiveStatsContent('default')}>
                        <CaretLeft size={32} />
                      </button>
                      <h3 onClick={() => setActiveStatsContent('default')}>
                        Últimos Jogos
                      </h3>
                    </div>
                    <ul>
                      {lastGames.map((game, index) => {
                        const isTeamA = game.teamA === teamStats.id
                        const opponentTeam = teams.find(
                          (team) =>
                            team.id === (isTeamA ? game.teamB : game.teamA),
                        )

                        const teamScore = isTeamA
                          ? game.score.teamA
                          : game.score.teamB
                        const opponentScore = isTeamA
                          ? game.score.teamB
                          : game.score.teamA

                        const formattedScore = `${teamScore} - ${opponentScore}`

                        return (
                          <li key={index}>
                            <img
                              src={opponentTeam?.logo}
                              alt={opponentTeam?.name}
                            />
                            {opponentTeam?.name}

                            <span>({formattedScore})</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </GuidesContainer>
      </Main>
      <div className="desk-stats-content">
        <div className="stats">
          <div className="team-stats">
            <div>
              <h3>Posição</h3>
              <div className="stat-content">
                <span>{teamPosition}</span>
                <span>/ {totalTeams.toString()}</span>
              </div>
            </div>
            <div className="overall">
              <h3>Desempenho Geral</h3>
              <div className="stat-content">
                <p>
                  Pontos: <strong>{teamStats?.stats?.points}</strong>
                </p>
                <p>
                  Vitórias: <strong>{teamStats?.stats?.wins} </strong> /{' '}
                  {teamStats?.stats
                    ? teamStats.stats.wins + teamStats.stats.losses
                    : '--'}
                </p>
                <p>
                  Sets Vencidos: <strong>{teamStats?.stats?.setsWon} </strong> /{' '}
                  {teamStats?.stats
                    ? teamStats.stats.setsWon + teamStats.stats.setsLost
                    : '--'}
                </p>
                <p>
                  Pontos Feitos:{' '}
                  <strong>{teamStats?.stats?.pointsScored}</strong>
                </p>
              </div>
            </div>

            <div>
              <h3>Últimos Jogos</h3>
              <ul>
                {lastGames.map((game, index) => {
                  const isTeamA = game.teamA === teamStats.id
                  const opponentTeam = teams.find(
                    (team) => team.id === (isTeamA ? game.teamB : game.teamA),
                  )

                  const teamScore = isTeamA
                    ? game.score.teamA
                    : game.score.teamB
                  const opponentScore = isTeamA
                    ? game.score.teamB
                    : game.score.teamA

                  const formattedScore = `${teamScore} - ${opponentScore}`

                  return (
                    <li key={index}>
                      <img src={opponentTeam?.logo} alt={opponentTeam?.name} />
                      {opponentTeam?.name}

                      <span>({formattedScore})</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
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
    </TeamDetailsContainer>
  )
}
