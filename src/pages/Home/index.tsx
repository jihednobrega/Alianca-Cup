import { useNavigate } from 'react-router-dom'
import { WhatsappLogo, InstagramLogo } from '@phosphor-icons/react'
import alianca from '../../assets/AV-logo-1.png'
import { HomeContainer, HeroSection, HighlightsSection, HighlightCard, Button } from './styles'

export function Home() {
  const navigate = useNavigate()
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
          <p>Confira a tabela de classificação após a 1º rodada.</p>
        </HighlightCard>
        <HighlightCard onClick={() => navigate('/calendar')}>
          <h2>Próximos Jogos</h2>
          <p>2º Rodada - Sábado (09/03), 16h</p>
        </HighlightCard>
        <HighlightCard onClick={() => navigate('/rules')}>
          <div>
            <h2>Regulamento</h2>
            <p>Consulte as regras e formato do campeonato.</p>
            {/* <button onClick={() => window.open('/path/to/regulamento.pdf', '_blank')}>Visualizar Regulamento</button> */}
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
                {/* aliancavolei84 */}
                <InstagramLogo size={40} />
                {/* <p>aliancavolei84</p> */}
              </a>
            </li>
          </ul>
        </HighlightCard>
      </HighlightsSection>
      <p className="copyright">© 2025 Aliança Cup. Todos os direitos reservados.</p>
    </HomeContainer>
  )
}
