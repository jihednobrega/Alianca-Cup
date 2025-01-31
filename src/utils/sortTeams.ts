type TeamStats = {
  id: number
  stats: {
    points: number
    wins: number
    setsWon: number
    setsLost: number
    pointsScored: number
    pointsConceded: number
  }
}

type Match = {
  teamA: number
  teamB: number
  score: {
    teamA: number
    teamB: number
  }
}

export function sortTeams(teams: TeamStats[], matches: Match[]) {
  return teams.sort((a, b) => {
    // 1. Pontos
    if (b.stats.points !== a.stats.points) {
      return b.stats.points - a.stats.points
    }

    // 2. Número de Vitórias
    if (b.stats.wins !== a.stats.wins) {
      return b.stats.wins - a.stats.wins
    }

    // 3. Set Average (Sets Ganhos / Sets Perdidos)
    const aSetAverage = a.stats.setsLost > 0 ? a.stats.setsWon / a.stats.setsLost : a.stats.setsWon
    const bSetAverage = b.stats.setsLost > 0 ? b.stats.setsWon / b.stats.setsLost : b.stats.setsWon
    if (bSetAverage !== aSetAverage) {
      return bSetAverage - aSetAverage
    }

    // 4. Points Average (Pontos Feitos / Pontos Sofridos)
    const aPointsAverage =
      a.stats.pointsConceded > 0 ? a.stats.pointsScored / a.stats.pointsConceded : a.stats.pointsScored
    const bPointsAverage =
      b.stats.pointsConceded > 0 ? b.stats.pointsScored / b.stats.pointsConceded : b.stats.pointsScored
    if (bPointsAverage !== aPointsAverage) {
      return bPointsAverage - aPointsAverage
    }

    // 5. Confronto Direto
    const directMatch = matches.find(
      (match) => (match.teamA === a.id && match.teamB === b.id) || (match.teamA === b.id && match.teamB === a.id),
    )
    if (directMatch) {
      const aWon =
        directMatch.teamA === a.id
          ? directMatch.score.teamA > directMatch.score.teamB
          : directMatch.score.teamB > directMatch.score.teamA
      return aWon ? -1 : 1
    }

    return 0
  })
}
