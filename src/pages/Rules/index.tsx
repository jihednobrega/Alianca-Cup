import { useState } from 'react'
import { CaretLeft } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { RulesContainer } from './styles'

export function Rules() {
  const navigate = useNavigate()

  const [selectedFormat, setSelectedFormat] = useState<'6-7' | '8-9' | '10+' | null>(null)

  const handleSelect = (format: '6-7' | '8-9' | '10+') => {
    setSelectedFormat(format)
  }

  return (
    <RulesContainer>
      <div>
        {!selectedFormat ? (
          <>
            <button className="back-button" onClick={() => navigate(-1)}>
              <CaretLeft size={32} />
              <span>Voltar</span>
            </button>
            <h1>Regulamento do Campeonato</h1>
            <p className="subtitle">Escolha o formato correspondente ao número de equipes inscritas:</p>
            <div className="format-selection">
              <button onClick={() => handleSelect('6-7')}>6 a 7 times</button>
              <button onClick={() => handleSelect('8-9')}>8 a 9 times</button>
              <button onClick={() => handleSelect('10+')}>10+ times</button>
            </div>
          </>
        ) : (
          <>
            <button className="back-button" onClick={() => setSelectedFormat(null)}>
              <CaretLeft size={32} />
              <span>Voltar</span>
            </button>
            <h2>Objetivo do Campeonato</h2>
            <p>
              Incentivar a prática do voleibol amador além do desenvolvimento técnico, integração entre atletas e
              equipes, valorizando projetos esportivos locais.
            </p>
            {selectedFormat === '6-7' && (
              <>
                <h2>Formato para 6 a 7 Times</h2>
                <div className="selected-format">
                  <p>
                    O campeonato será disputado em jogos no formato melhor de 3 sets. O formato do torneio será Fase de
                    Grupos + Playoffs e, o primeiro, irá variar conforme o total de times participantes (mínimo 6):
                  </p>
                  <strong>Fase de Grupos</strong>
                  <ul>
                    <li>• Um único grupo com todas as equipes.</li>
                    <li>• Rodada todos contra todos.</li>
                    <li>
                      • <strong>Classificação:</strong> As 4 melhores disputarão automaticamente as finais (1º x 2º) e
                      disputa de 3º lugar (3º x 4º).
                    </li>
                  </ul>
                </div>
              </>
            )}
            {selectedFormat === '8-9' && (
              <>
                <h2>Formato para 8 a 9 Times</h2>
                <div className="selected-format">
                  <strong>Fase de Grupos</strong>
                  <ul>
                    <li>• Dois grupos (Grupo A e Grupo B).</li>
                    <li>• Rodada todos contra todos do outro grupo.</li>
                    <li>
                      • <strong>Classificação:</strong> As 2 melhores equipes de cada grupo avançam para os playoffs.
                    </li>
                  </ul>
                  <strong>Playoffs</strong>
                  <ul>
                    <li>
                      • <strong>Semifinais:</strong> 1º do Grupo A x 2º do Grupo B e 1º do Grupo B x 2º do Grupo A.
                    </li>
                    <li>
                      • <strong>Final e disputa de 3º lugar:</strong> Vencedores das semifinais disputam o título e
                      perdedores disputam o 3º lugar.
                    </li>
                  </ul>
                </div>
              </>
            )}
            {selectedFormat === '10+' && (
              <>
                <h2>Formato para 10 ou Mais Times</h2>
                <div className="selected-format">
                  <strong>Fase de Grupos</strong>
                  <ul>
                    <li>• Dois grupos (Grupo A e Grupo B).</li>
                    <li>• Rodada todos contra todos do mesmo grupo.</li>
                    <li>• Classificação: As 2 melhores equipes de cada grupo avançam para os playoffs.</li>
                  </ul>
                  <strong>Playoffs</strong>
                  <ul>
                    <li>
                      • <strong>Semifinais:</strong> 1º do Grupo A x 2º do Grupo B e 1º do Grupo B x 2º do Grupo A.
                    </li>
                    <li>
                      • <strong>Final e disputa de 3º lugar:</strong> Vencedores das semifinais disputam o título e
                      perdedores disputam o 3º lugar.
                    </li>
                  </ul>
                </div>
              </>
            )}
            <h2>Jogos</h2>
            <p>
              <strong>Horários</strong>: Previsto em cronograma podendo sofrer atrasos devido à duração das partidas
              anteriores. No entanto, não poderão ser antecipados sem que ambas equipes estejam de acordo.
            </p>
            <p>
              <strong>Local</strong>: Quadra do Edgar Barbosa.
            </p>
            <p>
              <strong>Datas</strong>: Jogos aos sábados e/ou domingos, conforme cronograma.
            </p>

            <h2>Arbitragem e Taxas</h2>
            <strong>Arbitragem:</strong>
            <ul>
              <li>• R$ 30 por equipe por jogo.</li>
              <li>• A ser pago em até 48h antes do início de cada rodada, passivo de W.O.</li>
            </ul>

            <h2>Regras Técnicas</h2>
            <p>
              <strong>Tempos Técnicos</strong>: 1 tempo técnico por set.
            </p>
            <p>
              <strong>Substituições</strong>: Máximo de 6 por set. O atleta substituído só retorna desfazendo a
              substituição.
            </p>

            <h2>Imprevistos e Reagendamentos</h2>
            <p>
              Rodadas que não puderem ser realizadas na data prevista por qualquer imprevisto serão reagendadas sem
              alterar o calendário geral da competição.
            </p>
            <p>
              No caso da rodada reagendada, as equipes ausentes não serão penalizadas e seu jogo precisará ser
              remarcado.
            </p>

            <h2>Comunicação</h2>
            <p>
              <strong>Cronograma e Atualizações</strong>: Publicados na página oficial do campeonato.
            </p>
            <p>
              <strong>Possíveis Alterações</strong>: Informadas na página oficial e via WhatsApp.
            </p>

            <h2>Premiação</h2>
            <strong>Troféus e Medalhas</strong>
            <ul>
              <li>
                <strong>• Campeão</strong>: Troféu + Medalhas.
              </li>
              <li>
                <strong>• Vice-campeão</strong>: Medalhas.
              </li>
              <li>
                <strong>• Terceiro Lugar</strong>: Medalhas.
              </li>
            </ul>
            <strong>Destaques Individuais</strong>
            <ul>
              <li>• Melhor da Partida</li>
              <li>• Seleção do campeonato</li>
            </ul>
            <footer>Organização do Aliança Cup</footer>
          </>
        )}
      </div>
      <p className="copyright">© 2025 Aliança Cup. Todos os direitos reservados.</p>
    </RulesContainer>
  )
}
