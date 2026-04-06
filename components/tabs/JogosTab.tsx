import { GAMES } from '@/lib/games-data'
import { GameBet } from '@/lib/types'
import GameCard from '@/components/GameCard'

interface Props {
  gameBets: Record<string, GameBet>
  onBetChange: (gameId: string, field: 'homeScore' | 'awayScore', value: string) => void
}

export default function JogosTab({ gameBets, onBetChange }: Props) {
  const groupGames = GAMES.filter(g => g.phase === 'grupo')
  const groups = [...new Set(groupGames.map(g => g.group))]

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        Preencha o placar que você aposta para cada jogo da fase de grupos.
      </p>
      {groups.map(group => (
        <div key={group} className="mb-8">
          <h2 className="text-base font-bold text-gray-700 mb-3 pb-2 border-b-2 border-green-500 flex items-center gap-2">
            <span className="text-green-600">▸</span>
            {group}
          </h2>
          <div className="space-y-3">
            {groupGames
              .filter(g => g.group === group)
              .map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  bet={gameBets[game.id]}
                  onBetChange={onBetChange}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
