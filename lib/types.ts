export type Phase = 'grupo' | 'oitavas' | 'quartas' | 'semi' | 'final'
export type TabId = 'jogos' | 'classificados' | 'especiais' | 'mata-mata'

export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  date: string   // "YYYY-MM-DD"
  time: string   // "HH:MM" (horário de Brasília)
  venue: string
  group: string
  phase: Phase
}

export interface GameBet {
  gameId: string
  homeScore: number | null
  awayScore: number | null
}

// Criando o atalho "Bet" para o BetForm não dar erro
export type Bet = GameBet

export interface GroupPrediction {
  first: string   // nome da seleção
  second: string  // nome da seleção
}

export interface SpecialBets {
  champion: string
  runnerUp: string
  topScorer: string   // nome do jogador
  bestPlayer: string  // nome do jogador
  lastPlace: string   // nome da seleção
}

export interface PlayerBets {
  playerName: string
  bets: Bet[]
  savedAt: string
}

export interface AllBets {
  playerName: string
  gameBets: Record<string, GameBet>                   // key: gameId
  groupPredictions: Record<string, GroupPrediction>   // key: "Grupo A", etc.
  thirdPlace: string[]   // 8 seleções 3ªs colocadas que avançam
  oitavas: string[]      // 16 seleções nas oitavas
  quartas: string[]      // 8 seleções nas quartas
  semi: string[]         // 4 semifinalistas
  specials: Partial<SpecialBets>
  savedAt: string
}