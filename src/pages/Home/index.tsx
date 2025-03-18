import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WhatsappLogo, InstagramLogo } from '@phosphor-icons/react'
import alianca from '../../assets/AV-logo-1.png'
import {
  HomeContainer,
  HeroSection,
  HighlightsSection,
  HighlightCard,
  Button,
} from './styles'

interface Round {
  round: number
  date: string
  games: {
    id: number
    time: string
    teamA: number
    teamB: number
    score?: { teamA: number; teamB: number }
  }[]
}

export function Home() {
  const navigate = useNavigate()
  const [latestCompletedRound, setLatestCompletedRound] = useState<
    number | null
  >(null)
  const [nextRound, setNextRound] = useState<Round | null>(null)

  useEffect(() => {
    async function fetchRounds() {
      const matchesData = await fetch('/data/matches.json').then((res) =>
        res.json(),
      )

      const completedRounds = matchesData.rounds.filter((round: Round) =>
        round.games.every(
          (game) =>
            game.score &&
            game.score.teamA !== undefined &&
            game.score.teamB !== undefined,
        ),
      )

      const futureRounds = matchesData.rounds.filter((round: Round) =>
        round.games.some(
          (game) =>
            !game.score ||
            game.score.teamA === undefined ||
            game.score.teamB === undefined,
        ),
      )

      const lastCompleted =
        completedRounds.length > 0
          ? completedRounds[completedRounds.length - 1].round
          : null
      setLatestCompletedRound(lastCompleted)

      setNextRound(futureRounds.length > 0 ? futureRounds[0] : null)
    }

    fetchRounds()
  }, [])

  return (
    <HomeContainer>
      <HeroSection>
        <div className="logo">
          <img src={alianca} sizes="" alt="" />
          <span>Aliança Cup</span>
        </div>
        <h1>Bem-vindo ao Aliança Cup</h1>
        <Button onClick={() => navigate('/teams')}>Conheça as Equipes</Button>
      </HeroSection>

      <HighlightsSection>
        <HighlightCard onClick={() => navigate('/ranking')}>
          <h2>Classificação</h2>
          <p>
            Confira a tabela de classificação após a{' '}
            {latestCompletedRound ? `${latestCompletedRound}º` : 'última'}{' '}
            rodada.
          </p>
        </HighlightCard>
        <HighlightCard onClick={() => navigate('/schedule')}>
          <h2>Próximos Jogos</h2>
          {nextRound ? (
            <p>
              {nextRound.round}º Rodada -{' '}
              {new Date(`${nextRound.date}T00:00:00`).toLocaleDateString(
                'pt-BR',
                { weekday: 'long' },
              )}{' '}
              (
              {new Date(`${nextRound.date}T00:00:00`).toLocaleDateString(
                'pt-BR',
              )}
              )
            </p>
          ) : (
            <p>Sem jogos programados.</p>
          )}
        </HighlightCard>
        <HighlightCard onClick={() => navigate('/rules')}>
          <div>
            <h2>Regulamento</h2>
            <p>Consulte as regras e formato do campeonato.</p>
          </div>
        </HighlightCard>
        <HighlightCard>
          <h2>Contato</h2>
          <p>
            <p>Algum problema ou feedback?</p>
          </p>
          <ul>
            <li>
              <strong>Whatsapp</strong>
              <a href="https://wa.me/+5584991233783">
                <WhatsappLogo size={40} />
              </a>
            </li>
            <li>
              <strong>Instagram: </strong>
              <a href="https://instagram.com/aliancavolei84" target="_blank">
                <InstagramLogo size={40} />
              </a>
            </li>
          </ul>
        </HighlightCard>
      </HighlightsSection>
      <p className="copyright">
        © 2025 Aliança Cup. Todos os direitos reservados.
      </p>
    </HomeContainer>
  )
}
