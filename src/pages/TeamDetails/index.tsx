import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TeamDetailsContainer, Header, Main, GuidesContainer, MainSquad, LiberoButton } from './styles'
import { ArrowsClockwise, CaretDown, CaretLeft, CaretUp } from '@phosphor-icons/react'

import Aliança from '../../assets/teams/Aliança Volei.png'
import SanMarino from '../../assets/teams/San Marino.png'
import Up from '../../assets/teams/Volei Up.png'
import VoleiNatal from '../../assets/teams/Volei Natal.png'
import GelaVolei from '../../assets/teams/Gela Volei.png'
import União from '../../assets/teams/Volei União.png'

import { PlayerCard } from '../../components/PlayerCard'

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
  libero?: Libero // `libero` é opcional
}

const teams: Team[] = [
  {
    id: 1,
    name: 'Aliança Volei',
    logo: Aliança,
    colorPrimary: '#0c4a6e',
    players: [
      {
        playerName: 'João',
        playerPosition: 'OPOSTO',
        playerNumber: '9',
        playerImage: '../../src/assets/players/aliança/João.png',
      },
      {
        playerName: 'Igor',
        playerPosition: 'CENTRAL',
        playerNumber: '14',
        playerImage: '../../src/assets/players/aliança/Igor.png',
      },
      {
        playerName: 'Matheus',
        playerPosition: 'PONTEIRO',
        playerNumber: '5',
        playerImage: '../../src/assets/players/aliança/Matheus.png',
      },
      {
        playerName: 'Láu',
        playerPosition: 'PONTEIRO',
        playerNumber: '1',
        playerImage: '../../src/assets/players/aliança/Lau.png',
        isTeamCaptain: true,
      },
      {
        playerName: 'Kildere',
        playerPosition: 'CENTRAL',
        playerNumber: '10',
        playerImage: '../../src/assets/players/aliança/Kildere.png',
      },
      {
        playerName: 'Cláudio',
        playerPosition: 'LEVANTADOR',
        playerNumber: '26',
        playerImage: '../../src/assets/players/aliança/Claudio.png',
      },
      {
        playerName: 'Gabriel M.',
        playerPosition: 'LEVANTADOR',
        playerNumber: '7',
        playerImage: '../../src/assets/players/aliança/Gabriel Motta.png',
      },
      {
        playerName: 'Victor',
        playerPosition: 'PONTEIRO',
        playerNumber: '19',
        playerImage: '../../src/assets/players/aliança/Victor.png',
      },
      {
        playerName: 'Jihed',
        playerPosition: 'PONTEIRO',
        playerNumber: '21',
        playerImage: '../../src/assets/players/aliança/Jihed.png',
      },
      {
        playerName: 'Greg',
        playerPosition: 'CENTRAL',
        playerNumber: '22',
        playerImage: '../../src/assets/players/aliança/Greg.png',
      },
      {
        playerName: 'Allyson',
        playerPosition: 'PONTEIRO',
        playerNumber: '3',
        playerImage: '../../src/assets/players/aliança/Allyson.png',
      },
      {
        playerName: 'Gabriel',
        playerPosition: 'PONTEIRO',
        playerNumber: '11',
        playerImage: '../../src/assets/players/aliança/Gabriel Macedo.png',
      },
      {
        playerName: 'Kenzo',
        playerPosition: 'OPOSTO',
        playerNumber: '12',
        playerImage: '../../src/assets/players/aliança/Kenzo.png',
      },
      {
        playerName: 'Hugo',
        playerPosition: 'CENTRAL',
        playerNumber: '6',
        playerImage: '../../src/assets/players/aliança/Hugo.png',
      },
    ],
  },
  {
    id: 2,
    name: 'San Marino',
    logo: SanMarino,
    colorPrimary: '#4c1d95',
    players: [
      {
        playerName: 'Lucas',
        playerPosition: 'OPOSTO',
        playerNumber: '11',
        playerImage: '../../src/assets/players/san marino/Lucas.png',
        isTeamCaptain: true,
      },
      {
        playerName: 'Sampaio',
        playerPosition: 'CENTRAL',
        playerNumber: '6',
        playerImage: '../../src/assets/players/san marino/Vitor.png',
      },
      {
        playerName: 'Solberg',
        playerPosition: 'PONTEIRO',
        playerNumber: '31',
        playerImage: '../../src/assets/players/san marino/Solberg.png',
      },
      {
        playerName: 'Aldo',
        playerPosition: 'PONTEIRO',
        playerNumber: '2',
        playerImage: '../../src/assets/players/san marino/Aldo.png',
      },
      {
        playerName: 'Kezz',
        playerPosition: 'CENTRAL',
        playerNumber: '8',
        playerImage: '../../src/assets/players/san marino/Kezz.png',
      },
      {
        playerName: 'Henze',
        playerPosition: 'LEVANTADOR',
        playerNumber: '5',
        playerImage: '../../src/assets/players/san marino/Henze.png',
      },
    ],
    libero: {
      playerName: 'Jadson',
      playerPosition: 'LIBERO',
      playerNumber: '25',
      playerImage: '../../src/assets/players/san marino/Jadson.png',
      substitutes: [4],
    },
  },
  {
    id: 3,
    name: 'Volei Up',
    logo: Up,
    colorPrimary: '#012b42',
    players: ['Jogador 10', 'Jogador 11', 'Jogador 12', 'Jogador 13', 'Jogador 14', 'Jogador 15'],
  },
  {
    id: 4,
    name: 'Volei Natal',
    logo: VoleiNatal,
    colorPrimary: '#1f3785',
    players: ['Jogador 16', 'Jogador 17', 'Jogador 18', 'Jogador 19', 'Jogador 20', 'Jogador 21'],
  },
  {
    id: 5,
    name: 'Gela Volei',
    logo: GelaVolei,
    colorPrimary: '#314ead',
    players: ['Jogador 22', 'Jogador 23', 'Jogador 24', 'Jogador 25', 'Jogador 26', 'Jogador 27'],
  },
  {
    id: 6,
    name: 'Volei União',
    logo: União,
    colorPrimary: '#14532d',
    players: [
      {
        playerName: 'Igor',
        playerPosition: 'OPOSTO',
        playerNumber: '7',
        playerImage: '../../src/assets/players/união/Igor.png',
        isTeamCaptain: true,
      },
      {
        playerName: 'Salgado',
        playerPosition: 'CENTRAL',
        playerNumber: '8',
        playerImage: '../../src/assets/players/união/Salgado.png',
      },
      {
        playerName: 'Mateus',
        playerPosition: 'PONTEIRO',
        playerNumber: '13',
        playerImage: '../../src/assets/players/união/Mateus.png',
      },
      {
        playerName: 'Pedro Igor',
        playerPosition: 'PONTEIRO',
        playerNumber: '15',
        playerImage: '../../src/assets/players/união/Pedro Igor.png',
      },
      {
        playerName: 'L. Eduardo',
        playerPosition: 'CENTRAL',
        playerNumber: '10',
        playerImage: '../../src/assets/players/união/Luiz Eduardo.png',
      },
      {
        playerName: 'Gabriel',
        playerPosition: 'LEVANTADOR',
        playerNumber: '2',
        playerImage: '../../src/assets/players/união/Gabriel.png',
      },
      {
        playerName: 'Murillo',
        playerPosition: 'LEVANTADOR',
        playerNumber: '12',
        playerImage: '../../src/assets/players/união/Murillo.png',
      },
      {
        playerName: 'Luiz Felipe',
        playerPosition: 'OPOSTO',
        playerNumber: '11',
        playerImage: '../../src/assets/players/união/Luiz Felipe.png',
      },
    ],
    libero: {
      playerName: 'Leonardo',
      playerPosition: 'LIBERO',
      playerNumber: '6',
      playerImage: '../../src/assets/players/união/Leonardo.png',
      substitutes: [4],
    },
  },
]

function isPlayer(player: Player | string): player is Player {
  return typeof player === 'object' && player !== null
}

export function TeamDetails() {
  const navigate = useNavigate()
  const { teamId } = useParams<{ teamId: string }>()

  const [activeTab, setActiveTab] = useState<'subs' | 'stats' | null>(null)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const team = teams.find((team) => team.id === Number(teamId))
  const players = team ? team.players : []

  const mainPlayers = players.slice(0, 6)
  const subsPlayers = players.slice(6)

  if (!team) {
    return <p>Time não encontrado!</p>
  }

  const [liberoSubstituted, setLiberoSubstituted] = useState<number[]>(team?.libero?.substitutes || [])
  const handleLiberoToggle = (index: number) => {
    setLiberoSubstituted((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }
  const [rotatingCards, setRotatingCards] = useState<number[]>([])
  const handleFlip = (index: number) => {
    // Adiciona o índice à lista de cards girando
    setRotatingCards((prev) => [...prev, index])

    // Após a rotação (600ms), remove o índice da lista
    setTimeout(() => {
      setRotatingCards((prev) => prev.filter((i) => i !== index))
      handleLiberoToggle(index) // Chama a troca do líbero após a animação
    }, 300) // Tempo de duração da animação
  }

  const toggleTab = (tab: 'subs' | 'stats') => {
    if (activeTab === tab) {
      // Fechar a aba ativa
      setIsContentVisible(false) // Primeiro, oculta o conteúdo
      setActiveTab(null) // Após 300ms, remove a aba ativa
    } else {
      // Abrir nova aba
      setIsContentVisible(true) // Exibe o conteúdo imediatamente
      setActiveTab(tab)
    }
  }

  const [activeStatsContent, setActiveStatsContent] = useState<'default' | 'highlights' | 'recentGames'>('default')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi fora do menu
      if (isContentVisible && !document.querySelector('.guides-container')?.contains(event.target as Node)) {
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

  return (
    <TeamDetailsContainer>
      <Header onClick={() => navigate(-1)}>
        <CaretLeft size={32} />
        <h1>{team.name}</h1>
      </Header>

      <Main>
        <MainSquad>
          {mainPlayers.map((player, index) => {
            if (typeof player === 'string') {
              // Renderizar um card genérico se for apenas uma string
              return (
                <PlayerCard
                  key={index}
                  teamName={team.name}
                  teamLogo={team.logo}
                  colorPrimary={team.colorPrimary}
                  playerName="--"
                  playerPosition="--"
                  playerNumber="-"
                  playerImage=""
                />
              )
            }

            const isSubstitutedByLibero = liberoSubstituted.includes(index)
            const displayedPlayer = isSubstitutedByLibero ? team.libero || player : player
            const isTeamCaptain = 'isTeamCaptain' in displayedPlayer ? (displayedPlayer.isTeamCaptain ?? false) : false // Define o capitão apenas para titulares
            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  transform: rotatingCards.includes(index) ? 'rotateY(90deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <PlayerCard
                  key={index}
                  teamName={team.name}
                  teamLogo={team.logo}
                  colorPrimary={team.colorPrimary}
                  playerName={displayedPlayer.playerName}
                  playerPosition={displayedPlayer.playerPosition}
                  playerNumber={displayedPlayer.playerNumber}
                  playerImage={displayedPlayer.playerImage}
                  isTeamCaptain={isTeamCaptain}
                />

                {team.libero && team.libero.substitutes.includes(index) && (
                  <LiberoButton onClick={() => handleFlip(index)}>
                    <ArrowsClockwise size={16} />
                  </LiberoButton>
                )}
              </div>
            )
          })}
        </MainSquad>
        <GuidesContainer isOpen={!!activeTab} className="guides-container">
          <div className="buttons">
            <button onClick={() => toggleTab('subs')} className={activeTab === 'subs' ? 'active' : ''}>
              Subs
              {activeTab === 'subs' ? <CaretDown size={24} /> : <CaretUp size={24} />}
            </button>
            <button onClick={() => toggleTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>
              {activeTab === 'stats' ? <CaretDown size={24} /> : <CaretUp size={24} />}
              Stats
            </button>
          </div>
          <div className={`subsContent ${activeTab === 'subs' && isContentVisible ? 'open' : ''}`}>
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
          <div className={`statsContent ${activeTab === 'stats' && isContentVisible ? 'open' : ''}`}>
            {activeTab === 'stats' && (
              <div className="stats">
                {activeStatsContent === 'default' && (
                  <div className="team-stats">
                    <div>
                      <h3>Posição</h3>
                      <div className="stat-content">
                        <p>1º</p>
                        <div className="bar"></div>
                        <p>6</p>
                      </div>
                    </div>
                    <div className="overall">
                      <h3>Desempenho Geral</h3>
                      <div className="stat-content">
                        <p>
                          Pontos: <strong>21</strong>
                        </p>
                        <p>
                          Vitórias: <strong>7/7</strong>
                        </p>
                        <p>
                          Sets Vencidos: <strong>14/14</strong>
                        </p>
                        <p>
                          Pontos Feitos: <strong>355</strong>
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setActiveStatsContent('highlights')}>
                      <h3>Destaques do Time</h3>
                    </button>
                    <button onClick={() => setActiveStatsContent('recentGames')}>
                      <h3>Últimos Jogos</h3>
                    </button>
                  </div>
                )}
                {activeStatsContent === 'highlights' && (
                  <div>
                    <div className="statsHeader">
                      <button onClick={() => setActiveStatsContent('default')}>
                        <CaretLeft size={32} />
                      </button>
                      <h3>Destaques do Time</h3>
                    </div>
                    <ul>
                      <li>
                        Maior Pontuador:
                        {isPlayer(team.players[0]) && (
                          <>
                            <img src={team.players[0].playerImage} alt="Maior Pontuador" />
                            <strong>{team.players[0].playerName}</strong>
                          </>
                        )}
                        <span>(120 pontos)</span>
                      </li>
                      <li>
                        Maior Bloqueador:
                        {isPlayer(team.players[4]) && (
                          <>
                            <img src={team.players[4].playerImage} alt="Maior Bloqueador" />
                            <strong>{team.players[4].playerName}</strong>
                          </>
                        )}
                        <span>(35 bloqueios)</span>
                      </li>
                      <li>
                        Líder em aces:
                        {isPlayer(team.players[1]) && (
                          <>
                            <img src={team.players[1].playerImage} alt="Líder em Aces" />
                            <strong>{team.players[1].playerName}</strong>
                          </>
                        )}
                        <span>(10 aces)</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeStatsContent === 'recentGames' && (
                  <div>
                    <div className="statsHeader">
                      <button onClick={() => setActiveStatsContent('default')}>
                        <CaretLeft size={32} />
                      </button>
                      <h3>Últimos Jogos</h3>
                    </div>
                    <ul>
                      <li>
                        <img src={teams[1].logo} />
                        San Marino <span>(2-0)</span>
                      </li>
                      <li>
                        <img src={teams[3].logo} />
                        Volei Natal <span>(2-0)</span>
                      </li>
                      <li>
                        <img src={teams[5].logo} />
                        Volei União <span>(2-0)</span>
                      </li>
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
                <span>1</span>
                <span>/6</span>
              </div>
            </div>
            <div className="overall">
              <h3>Desempenho Geral</h3>
              <div className="stat-content">
                <p>
                  Pontos: <strong>21</strong>
                </p>
                <p>
                  Vitórias: <strong>7 </strong>/ 7
                </p>
                <p>
                  Sets Vencidos: <strong>14 </strong>/ 14
                </p>
                <p>
                  Pontos Feitos: <strong>355</strong>
                </p>
              </div>
            </div>
            <div>
              <h3>Destaques do Time</h3>
              <ul>
                <li>
                  Maior Pontuador:
                  {isPlayer(team.players[0]) && (
                    <>
                      <img src={team.players[0].playerImage} alt="Maior Pontuador" />
                      <strong>{team.players[0].playerName}</strong>
                    </>
                  )}
                  <span>(120 pontos)</span>
                </li>
                <li>
                  Maior Bloqueador:
                  {isPlayer(team.players[4]) && (
                    <>
                      <img src={team.players[4].playerImage} alt="Maior Bloqueador" />
                      <strong>{team.players[4].playerName}</strong>
                    </>
                  )}
                  <span>(35 bloqueios)</span>
                </li>
                <li>
                  Líder em aces:
                  {isPlayer(team.players[1]) && (
                    <>
                      <img src={team.players[1].playerImage} alt="Líder em Aces" />
                      <strong>{team.players[1].playerName}</strong>
                    </>
                  )}
                  <span>(10 aces)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3>Últimos Jogos</h3>
              <ul>
                <li>
                  <img src={teams[1].logo} />
                  San Marino <span>(2-0)</span>
                </li>
                <li>
                  <img src={teams[3].logo} />
                  Volei Natal <span>(2-0)</span>
                </li>
                <li>
                  <img src={teams[5].logo} />
                  Volei União <span>(2-0)</span>
                </li>
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
