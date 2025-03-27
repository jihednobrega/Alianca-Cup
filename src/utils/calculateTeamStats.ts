interface Match {
  id: number
  round: number
  date: string
  teamA: number
  teamB: number
  score: { teamA: number; teamB: number }
  sets: string[]
}

interface Team {
  id: number
  name: string
  shortName: string
  logo: string
  colorPrimary: string
}

interface MatchesData {
  rounds: {
    round: number | string
    date: string
    games: Match[]
  }[]
}

export function calculateTeamStats(teams: Team[], matchesData: MatchesData) {
  const matches: Match[] = matchesData.rounds.flatMap((round) => round.games)

  return teams.map((team) => {
    const teamMatches = matches.filter(
      (match) =>
        (match.teamA === team.id || match.teamB === team.id) &&
        match.score &&
        match.sets &&
        match.sets.length > 0,
    )

    const stats = teamMatches.reduce(
      (acc, match) => {
        const isTeamA = match.teamA === team.id
        const teamSets = match.sets.map((set) => {
          const [teamAScore, teamBScore] = set.split('-').map(Number)
          return isTeamA ? teamAScore : teamBScore
        })
        const opponentSets = match.sets.map((set) => {
          const [teamAScore, teamBScore] = set.split('-').map(Number)
          return isTeamA ? teamBScore : teamAScore
        })

        acc.games += 1
        acc.pointsScored += teamSets.reduce((a, b) => a + b, 0)
        acc.pointsConceded += opponentSets.reduce((a, b) => a + b, 0)

        acc.setsWon += isTeamA
          ? match.sets.filter((set) => {
              const [teamAScore, teamBScore] = set.split('-').map(Number)
              return teamAScore > teamBScore
            }).length
          : match.sets.filter((set) => {
              const [teamAScore, teamBScore] = set.split('-').map(Number)
              return teamBScore > teamAScore
            }).length

        acc.setsLost += isTeamA
          ? match.sets.filter((set) => {
              const [teamAScore, teamBScore] = set.split('-').map(Number)
              return teamAScore < teamBScore
            }).length
          : match.sets.filter((set) => {
              const [teamAScore, teamBScore] = set.split('-').map(Number)
              return teamBScore < teamAScore
            }).length

        if (
          isTeamA
            ? match.score.teamA > match.score.teamB
            : match.score.teamB > match.score.teamA
        ) {
          acc.wins += 1
        } else {
          acc.losses += 1
        }

        if (isTeamA) {
          if (match.score.teamA === 2 && match.score.teamB === 0) {
            acc.points += 3
          } else if (match.score.teamA === 2 && match.score.teamB === 1) {
            acc.points += 2
          } else if (match.score.teamA === 1 && match.score.teamB === 2) {
            acc.points += 1
          }
        } else {
          if (match.score.teamB === 2 && match.score.teamA === 0) {
            acc.points += 3
          } else if (match.score.teamB === 2 && match.score.teamA === 1) {
            acc.points += 2
          } else if (match.score.teamB === 1 && match.score.teamA === 2) {
            acc.points += 1
          }
        }

        return acc
      },
      {
        points: 0,
        games: 0,
        wins: 0,
        losses: 0,
        setsWon: 0,
        setsLost: 0,
        pointsScored: 0,
        pointsConceded: 0,
      },
    )

    return { ...team, stats }
  })
}
