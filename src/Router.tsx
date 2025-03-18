import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Teams } from './pages/Teams'
import { Schedule } from './pages/Schedule'
import { Home } from './pages/Home'
import { Ranking } from './pages/Ranking'
import { TeamDetails } from './pages/TeamDetails'
import { Rules } from './pages/Rules'
import { ChampionshipTeam } from './pages/ChampionshipTeam'
import { RoundHighlights } from './pages/RoundHighlights'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamId" element={<TeamDetails />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="highlights" element={<RoundHighlights />} />
        <Route path="championship-team" element={<ChampionshipTeam />} />
      </Route>
    </Routes>
  )
}
