import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Teams } from './pages/Teams'
import { Calendar } from './pages/Calendar'
import { Home } from './pages/Home'
import { Ranking } from './pages/Ranking'
import { TeamDetails } from './pages/TeamDetails'
import { Rules } from './pages/Rules'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamId" element={<TeamDetails />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="ranking" element={<Ranking />} />
      </Route>
    </Routes>
  )
}
