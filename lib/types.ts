export type Phase = 'grupo' | 'oitavas' | 'quartas' | 'semi' | 'final'
export type TabId = 'jogos' | 'classificados' | 'especiais' | 'mata-mata'

export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  date: string
  time: string
  venue: string
  group: string
  phase: Phase
}

export interface GameBet {
  gameId: string
  homeScore: number | null
  awayScore: number | null
}

// ESSA LINHA É A QUE CORRIGE O ERRO:
export type Bet = GameBet 

export interface GroupPrediction {
  first: string
  second: string
}

export interface SpecialBets {
  champion: string
  runnerUp: string
  topScorer: string
  bestPlayer: string
  lastPlace: string
}

export interface PlayerBets {
  playerName: string
  bets: Bet[]
  savedAt: string
}

export interface AllBets {
  playerName: string
  gameBets: Record<string, GameBet>
  groupPredictions: Record<string, GroupPrediction>
  thirdPlace: string[]
  oitavas: string[]
  quartas: string[]
  semi: string[]
  specials: Partial<SpecialBets>
  savedAt: string
}