import { Game, GameBet } from '@/lib/types'

interface Props {
  game: Game
  bet?: GameBet
  onBetChange: (gameId: string, field: 'homeScore' | 'awayScore', value: string) => void
}

function formatDate(dateStr: string, time: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' })
  const dayMonth = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  return `${weekday}, ${dayMonth} • ${time}h`
}

export default function GameCard({ game, bet, onBetChange }: Props) {
  const hasBet = bet !== undefined && bet.homeScore !== null && bet.awayScore !== null

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-4 transition-shadow hover:shadow-md ${
        hasBet ? 'border-green-200' : 'border-gray-200'
      }`}
    >
      {/* Data e local */}
      <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
        <span>{formatDate(game.date, game.time)} (Brasília)</span>
        <span className="text-right hidden sm:block">{game.venue}</span>
      </div>

      {/* Times e inputs */}
      <div className="flex items-center gap-2">
        {/* Time da casa */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span className="font-semibold text-gray-900 text-sm truncate">{game.homeTeam}</span>
          <span className="text-2xl flex-shrink-0">{game.homeFlag}</span>
        </div>

        {/* Inputs de placar */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={20}
            value={bet?.homeScore ?? ''}
            onChange={e => onBetChange(game.id, 'homeScore', e.target.value)}
            placeholder="–"
            className="w-11 h-11 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-colors"
          />
          <span className="text-gray-300 font-bold text-lg">×</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={20}
            value={bet?.awayScore ?? ''}
            onChange={e => onBetChange(game.id, 'awayScore', e.target.value)}
            placeholder="–"
            className="w-11 h-11 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-colors"
          />
        </div>

        {/* Time visitante */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-2xl flex-shrink-0">{game.awayFlag}</span>
          <span className="font-semibold text-gray-900 text-sm truncate">{game.awayTeam}</span>
        </div>
      </div>

      {/* Local em mobile */}
      <p className="text-xs text-gray-400 text-center mt-2 sm:hidden">{game.venue}</p>
    </div>
  )
}
