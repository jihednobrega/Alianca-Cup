import { RankingContainer, RankingList, History, Legend } from './styles'

import Aliança from '../../assets/teams/Aliança Volei.png'
import SanMarino from '../../assets/teams/San Marino.png'
import Up from '../../assets/teams/Volei Up.png'
import VoleiNatal from '../../assets/teams/Volei Natal.png'
import GelaVolei from '../../assets/teams/Gela Volei.png'
import União from '../../assets/teams/Volei União.png'

export function Ranking() {
  return (
    <RankingContainer>
      <h1>Classificação</h1>
      <RankingList>
        <div className="mainTable">
          <table>
            <thead>
              <tr>
                <th>Equipe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="team">
                  <strong>1</strong>
                  <img src={Aliança} />
                  <p className="nameOnMobile">ALI</p>
                  <p className="nameOnDesk">Aliança</p>
                </td>
              </tr>
              <tr>
                <td className="team">
                  <strong>2</strong>
                  <img src={SanMarino} />
                  <p className="nameOnMobile">SAN</p>
                  <p className="nameOnDesk">San Marino</p>
                </td>
              </tr>
              <tr>
                <td className="team">
                  <strong>3</strong>
                  <img src={União} />
                  <p className="nameOnMobile">UNI</p>
                  <p className="nameOnDesk">União</p>
                </td>
              </tr>
              <tr>
                <td className="team">
                  <strong>4</strong>
                  <img src={GelaVolei} />
                  <p className="nameOnMobile">GEL</p>
                  <p className="nameOnDesk">Gela Vôlei</p>
                </td>
              </tr>
              <tr>
                <td className="team">
                  <strong>5</strong>
                  <img src={Up} />
                  <p className="nameOnMobile">VUP</p>
                  <p className="nameOnDesk">Vôlei Up</p>
                </td>
              </tr>
              <tr>
                <td className="team">
                  <strong>6</strong>
                  <img src={VoleiNatal} />
                  <p className="nameOnMobile">VNA</p>
                  <p className="nameOnDesk">Vôlei Natal</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <table>
              <thead>
                <tr>
                  <th title="Pontos">P</th>
                  <th title="Jogos">J</th>
                  <th title="Vitórias">V</th>
                  <th title="Derrotas">D</th>
                  <th title="Sets Ganhos">SG</th>
                  <th title="Sets Perdidos">SP</th>
                  <th title="Pontos Feitos">PF</th>
                  <th title="Pontos Sofridos">PS</th>
                  <th title="Média de Sets">MS</th>
                  <th title="Média de Pontos">MP</th>
                  <th>Histórico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>21</td>
                  <td>7</td>
                  <td>7</td>
                  <td>0</td>
                  <td>14</td>
                  <td>0</td>
                  <td>355</td>
                  <td>213</td>
                  <td>2</td>
                  <td>1,67</td>
                  <td>
                    <ul>
                      <History gameResultColor="win" />
                      <History gameResultColor="win" />
                      <History gameResultColor="win" />
                      <History gameResultColor="win" />
                      <History gameResultColor="win" />
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>7</td>
                  <td>4</td>
                  <td>3</td>
                  <td>10</td>
                  <td>8</td>
                  <td>315</td>
                  <td>303</td>
                  <td>1,25</td>
                  <td>1,03</td>
                  <td>
                    <ul>
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>7</td>
                  <td>3</td>
                  <td>4</td>
                  <td>8</td>
                  <td>10</td>
                  <td>325</td>
                  <td>320</td>
                  <td>0,8</td>
                  <td>1,01</td>
                  <td>
                    <ul>
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>7</td>
                  <td>3</td>
                  <td>4</td>
                  <td>6</td>
                  <td>8</td>
                  <td>305</td>
                  <td>313</td>
                  <td>0,75</td>
                  <td>0,97</td>
                  <td>
                    <ul>
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>7</td>
                  <td>3</td>
                  <td>4</td>
                  <td>6</td>
                  <td>9</td>
                  <td>299</td>
                  <td>300</td>
                  <td>0,66</td>
                  <td>0,99</td>
                  <td>
                    <ul>
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>7</td>
                  <td>2</td>
                  <td>5</td>
                  <td>5</td>
                  <td>10</td>
                  <td>267</td>
                  <td>325</td>
                  <td>0,40</td>
                  <td>0,82</td>
                  <td>
                    <ul>
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="lose" />
                      <History gameResultColor="win" />
                      <History gameResultColor="win" />
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Legend>
          <span>P - Pontos</span>
          <span>J - Jogos</span>
          <span>V - Vitórias</span>
          <span>D - Derrotas</span>
          <span>SG - Sets Ganhos</span>
          <span>SP - Sets Perdidos</span>
          <span>PF - Pontos Feitos</span>
          <span>PS - Pontos Sofridos</span>
          <span>MS - Média de Sets</span>
          <span>MP - Média de Pontos</span>
        </Legend>
      </RankingList>
    </RankingContainer>
  )
}
