import { Game, GameBet } from '@/lib/types'

interface Props {
  game: Game
  bet?: GameBet
  onBetChange: (gameId: string, field: 'homeScore' | 'awayScore', value: string) => void
}

const TEAM_CODES: Record<string, string> = {
  'México': 'mx', 'África do Sul': 'za', 'Coreia do Sul': 'kr', 'Tchéquia': 'cz',
  'Canadá': 'ca', 'Gana': 'gh', 'Suécia': 'se', 'Peru': 'pe',
  'EUA': 'us', 'Nigéria': 'ng', 'Noruega': 'no', 'Arábia Saudita': 'sa',
  'Brasil': 'br', 'Camarões': 'cm', 'Suíça': 'ch', 'Costa Rica': 'cr',
  'Argentina': 'ar', 'Argélia': 'dz', 'Polônia': 'pl', 'Chile': 'cl',
  'França': 'fr', 'Egito': 'eg', 'Austrália': 'au', 'Jamaica': 'jm',
  'Espanha': 'es', 'Tunísia': 'tn', 'Japão': 'jp', 'Colômbia': 'co',
  'Inglaterra': 'gb-eng', 'Mali': 'ml', 'Áustria': 'at', 'Equador': 'ec',
  'Bélgica': 'be', 'Marrocos': 'ma', 'Turquia': 'tr', 'Paraguai': 'py',
  'Portugal': 'pt', 'Costa do Marfim': 'ci', 'Sérvia': 'rs', 'Panamá': 'pa',
  'Itália': 'it', 'Senegal': 'sn', 'Dinamarca': 'dk', 'Uruguai': 'uy',
  'Alemanha': 'de', 'Irã': 'ir', 'Holanda': 'nl', 'Uzbequistão': 'uz'
};

export default function GameCard({ game, bet, onBetChange }: Props) {
  const hasBet = bet !== undefined && bet.homeScore !== null && bet.awayScore !== null
  const getFlagUrl = (name: string) => `https://flagcdn.com/w80/${TEAM_CODES[name] || 'un'}.png`;

  return (
    <div className={`bg-white rounded-xl border-2 shadow-md p-4 mb-3 ${hasBet ? 'border-green-600' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4 text-[10px] font-black text-gray-500 uppercase">
        <span>{game.date} • {game.time}H</span>
        <span>{game.venue}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center justify-end gap-2">
          <span className="font-black text-black text-sm text-right leading-tight">{game.homeTeam}</span>
          <img src={getFlagUrl(game.homeTeam)} className="w-9 h-6 shadow-sm border rounded-sm object-cover" />
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={bet?.homeScore ?? ''}
            onChange={e => onBetChange(game.id, 'homeScore', e.target.value)}
            placeholder="0"
            className="w-12 h-12 text-center text-xl font-black text-black border-2 border-gray-400 rounded-lg outline-none focus:border-green-600"
          />
          <span className="font-black text-black">×</span>
          <input
            type="number"
            value={bet?.awayScore ?? ''}
            onChange={e => onBetChange(game.id, 'awayScore', e.target.value)}
            placeholder="0"
            className="w-12 h-12 text-center text-xl font-black text-black border-2 border-gray-400 rounded-lg outline-none focus:border-green-600"
          />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <img src={getFlagUrl(game.awayTeam)} className="w-9 h-6 shadow-sm border rounded-sm object-cover" />
          <span className="font-black text-black text-sm leading-tight">{game.awayTeam}</span>
        </div>
      </div>
    </div>
  )
}