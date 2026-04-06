import { Game } from './types'

// Jogos da fase de grupos — Copa do Mundo 2026
// Horários em UTC-3 (Brasília). Atualize conforme calendário oficial confirmado.
export const GAMES: Game[] = [
  // ── Grupo D ─────────────────────────────────────────────────────────────
  {
    id: 'gD01',
    homeTeam: 'Brasil',
    awayTeam: 'Espanha',
    homeFlag: '🇧🇷',
    awayFlag: '🇪🇸',
    date: '2026-06-14',
    time: '19:00',
    venue: 'MetLife Stadium, Nova York',
    group: 'Grupo D',
    phase: 'grupo',
  },
  {
    id: 'gD02',
    homeTeam: 'Arábia Saudita',
    awayTeam: 'Costa do Marfim',
    homeFlag: '🇸🇦',
    awayFlag: '🇨🇮',
    date: '2026-06-14',
    time: '22:00',
    venue: 'AT&T Stadium, Dallas',
    group: 'Grupo D',
    phase: 'grupo',
  },
  {
    id: 'gD03',
    homeTeam: 'Brasil',
    awayTeam: 'Costa do Marfim',
    homeFlag: '🇧🇷',
    awayFlag: '🇨🇮',
    date: '2026-06-19',
    time: '19:00',
    venue: 'Rose Bowl, Los Angeles',
    group: 'Grupo D',
    phase: 'grupo',
  },
  {
    id: 'gD04',
    homeTeam: 'Espanha',
    awayTeam: 'Arábia Saudita',
    homeFlag: '🇪🇸',
    awayFlag: '🇸🇦',
    date: '2026-06-19',
    time: '22:00',
    venue: "Levi's Stadium, San Francisco",
    group: 'Grupo D',
    phase: 'grupo',
  },
  {
    id: 'gD05',
    homeTeam: 'Brasil',
    awayTeam: 'Arábia Saudita',
    homeFlag: '🇧🇷',
    awayFlag: '🇸🇦',
    date: '2026-06-23',
    time: '22:00',
    venue: 'Hard Rock Stadium, Miami',
    group: 'Grupo D',
    phase: 'grupo',
  },
  {
    id: 'gD06',
    homeTeam: 'Espanha',
    awayTeam: 'Costa do Marfim',
    homeFlag: '🇪🇸',
    awayFlag: '🇨🇮',
    date: '2026-06-23',
    time: '22:00',
    venue: 'Lincoln Financial Field, Filadélfia',
    group: 'Grupo D',
    phase: 'grupo',
  },

  // ── Grupo E ─────────────────────────────────────────────────────────────
  {
    id: 'gE01',
    homeTeam: 'Argentina',
    awayTeam: 'Peru',
    homeFlag: '🇦🇷',
    awayFlag: '🇵🇪',
    date: '2026-06-13',
    time: '19:00',
    venue: 'MetLife Stadium, Nova York',
    group: 'Grupo E',
    phase: 'grupo',
  },
  {
    id: 'gE02',
    homeTeam: 'França',
    awayTeam: 'Polônia',
    homeFlag: '🇫🇷',
    awayFlag: '🇵🇱',
    date: '2026-06-13',
    time: '22:00',
    venue: 'Arrowhead Stadium, Kansas City',
    group: 'Grupo E',
    phase: 'grupo',
  },
  {
    id: 'gE03',
    homeTeam: 'Argentina',
    awayTeam: 'França',
    homeFlag: '🇦🇷',
    awayFlag: '🇫🇷',
    date: '2026-06-18',
    time: '22:00',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    group: 'Grupo E',
    phase: 'grupo',
  },
  {
    id: 'gE04',
    homeTeam: 'Polônia',
    awayTeam: 'Peru',
    homeFlag: '🇵🇱',
    awayFlag: '🇵🇪',
    date: '2026-06-18',
    time: '19:00',
    venue: 'Gillette Stadium, Boston',
    group: 'Grupo E',
    phase: 'grupo',
  },
  {
    id: 'gE05',
    homeTeam: 'Argentina',
    awayTeam: 'Polônia',
    homeFlag: '🇦🇷',
    awayFlag: '🇵🇱',
    date: '2026-06-22',
    time: '22:00',
    venue: 'SoFi Stadium, Los Angeles',
    group: 'Grupo E',
    phase: 'grupo',
  },
  {
    id: 'gE06',
    homeTeam: 'França',
    awayTeam: 'Peru',
    homeFlag: '🇫🇷',
    awayFlag: '🇵🇪',
    date: '2026-06-22',
    time: '22:00',
    venue: 'NRG Stadium, Houston',
    group: 'Grupo E',
    phase: 'grupo',
  },

  // ── Grupo A ─────────────────────────────────────────────────────────────
  {
    id: 'gA01',
    homeTeam: 'EUA',
    awayTeam: 'Albânia',
    homeFlag: '🇺🇸',
    awayFlag: '🇦🇱',
    date: '2026-06-11',
    time: '22:00',
    venue: 'SoFi Stadium, Los Angeles',
    group: 'Grupo A',
    phase: 'grupo',
  },
  {
    id: 'gA02',
    homeTeam: 'Ucrânia',
    awayTeam: 'Panamá',
    homeFlag: '🇺🇦',
    awayFlag: '🇵🇦',
    date: '2026-06-11',
    time: '19:00',
    venue: 'MetLife Stadium, Nova York',
    group: 'Grupo A',
    phase: 'grupo',
  },
  {
    id: 'gA03',
    homeTeam: 'EUA',
    awayTeam: 'Ucrânia',
    homeFlag: '🇺🇸',
    awayFlag: '🇺🇦',
    date: '2026-06-16',
    time: '22:00',
    venue: 'AT&T Stadium, Dallas',
    group: 'Grupo A',
    phase: 'grupo',
  },
  {
    id: 'gA04',
    homeTeam: 'Panamá',
    awayTeam: 'Albânia',
    homeFlag: '🇵🇦',
    awayFlag: '🇦🇱',
    date: '2026-06-16',
    time: '19:00',
    venue: 'Hard Rock Stadium, Miami',
    group: 'Grupo A',
    phase: 'grupo',
  },
  {
    id: 'gA05',
    homeTeam: 'EUA',
    awayTeam: 'Panamá',
    homeFlag: '🇺🇸',
    awayFlag: '🇵🇦',
    date: '2026-06-20',
    time: '22:00',
    venue: 'Lumen Field, Seattle',
    group: 'Grupo A',
    phase: 'grupo',
  },
  {
    id: 'gA06',
    homeTeam: 'Albânia',
    awayTeam: 'Ucrânia',
    homeFlag: '🇦🇱',
    awayFlag: '🇺🇦',
    date: '2026-06-20',
    time: '22:00',
    venue: 'Arrowhead Stadium, Kansas City',
    group: 'Grupo A',
    phase: 'grupo',
  },

  // ── Grupo B ─────────────────────────────────────────────────────────────
  {
    id: 'gB01',
    homeTeam: 'México',
    awayTeam: 'Jamaica',
    homeFlag: '🇲🇽',
    awayFlag: '🇯🇲',
    date: '2026-06-12',
    time: '22:00',
    venue: 'Azteca, Cidade do México',
    group: 'Grupo B',
    phase: 'grupo',
  },
  {
    id: 'gB02',
    homeTeam: 'Bélgica',
    awayTeam: 'Camarões',
    homeFlag: '🇧🇪',
    awayFlag: '🇨🇲',
    date: '2026-06-12',
    time: '19:00',
    venue: 'Estadio Akron, Guadalajara',
    group: 'Grupo B',
    phase: 'grupo',
  },
  {
    id: 'gB03',
    homeTeam: 'México',
    awayTeam: 'Bélgica',
    homeFlag: '🇲🇽',
    awayFlag: '🇧🇪',
    date: '2026-06-17',
    time: '22:00',
    venue: 'Estadio BBVA, Monterrey',
    group: 'Grupo B',
    phase: 'grupo',
  },
  {
    id: 'gB04',
    homeTeam: 'Camarões',
    awayTeam: 'Jamaica',
    homeFlag: '🇨🇲',
    awayFlag: '🇯🇲',
    date: '2026-06-17',
    time: '19:00',
    venue: 'Azteca, Cidade do México',
    group: 'Grupo B',
    phase: 'grupo',
  },
  {
    id: 'gB05',
    homeTeam: 'México',
    awayTeam: 'Camarões',
    homeFlag: '🇲🇽',
    awayFlag: '🇨🇲',
    date: '2026-06-21',
    time: '22:00',
    venue: 'Estadio Akron, Guadalajara',
    group: 'Grupo B',
    phase: 'grupo',
  },
  {
    id: 'gB06',
    homeTeam: 'Jamaica',
    awayTeam: 'Bélgica',
    homeFlag: '🇯🇲',
    awayFlag: '🇧🇪',
    date: '2026-06-21',
    time: '22:00',
    venue: 'Estadio BBVA, Monterrey',
    group: 'Grupo B',
    phase: 'grupo',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────

/** Retorna times agrupados por grupo, derivado dos jogos cadastrados. */
export function getTeamsByGroup(): Record<string, Array<{ name: string; flag: string }>> {
  const groups: Record<string, Map<string, string>> = {}
  GAMES.filter(g => g.phase === 'grupo').forEach(game => {
    if (!groups[game.group]) groups[game.group] = new Map()
    groups[game.group].set(game.homeTeam, game.homeFlag)
    groups[game.group].set(game.awayTeam, game.awayFlag)
  })
  return Object.fromEntries(
    Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([group, teamsMap]) => [
        group,
        Array.from(teamsMap.entries()).map(([name, flag]) => ({ name, flag })),
      ])
  )
}

/** Retorna todos os times em ordem alfabética. */
export function getAllTeams(): Array<{ name: string; flag: string }> {
  const teams = new Map<string, string>()
  GAMES.forEach(game => {
    teams.set(game.homeTeam, game.homeFlag)
    teams.set(game.awayTeam, game.awayFlag)
  })
  return Array.from(teams.entries())
    .map(([name, flag]) => ({ name, flag }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}
