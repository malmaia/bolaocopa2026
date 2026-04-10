'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { AllBets } from '@/lib/types'
import { GAMES } from '@/lib/games-data'

const STORAGE_KEY = 'bolao2026_v2'

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

export default function RankingPage() {
  const [bets, setBets] = useState<AllBets | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setBets(JSON.parse(stored)) } catch { }
    }
    setLoaded(true)
  }, [])

  const getFlagUrl = (name: string) => `https://flagcdn.com/w40/${TEAM_CODES[name] || 'un'}.png`;

  if (!loaded) return null

  if (!bets) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-6xl mb-4">⚽</p>
          <p className="text-black font-black text-xl mb-6">NENHUM PALPITE SALVO AINDA.</p>
          <Link href="/" className="bg-green-700 text-white px-8 py-4 rounded-xl font-black hover:bg-green-800 transition-all">
            PREENCHER MINHA CARTELA
          </Link>
        </main>
      </>
    )
  }

  const groupGames = GAMES.filter(g => g.phase === 'grupo')

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
        <div className="bg-white rounded-2xl border-4 border-green-700 p-6 mb-8 shadow-xl">
          <h2 className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Participante</h2>
          <p className="text-3xl font-black text-black uppercase">{bets.playerName || 'Sem Nome'}</p>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">🏆 Apostas Especiais</h3>
            <div className="bg-white rounded-xl border-2 border-gray-300 divide-y-2 divide-gray-100">
              <Row label="Campeão" value={bets.specials.champion} flag={getFlagUrl(bets.specials.champion || '')} />
              <Row label="Vice-Campeão" value={bets.specials.runnerUp} flag={getFlagUrl(bets.specials.runnerUp || '')} />
              <Row label="Goleador" value={bets.specials.topScorer} isPlayer />
              <Row label="Melhor Jogador" value={bets.specials.bestPlayer} isPlayer />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">📅 Meus Placares</h3>
            <div className="grid grid-cols-1 gap-3">
              {groupGames.map(game => {
                const bet = bets.gameBets[game.id]
                if (!bet) return null
                return (
                  <div key={game.id} className="bg-white p-3 rounded-xl border-2 border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-bold text-black truncate">{game.homeTeam}</span>
                      <img src={getFlagUrl(game.homeTeam)} className="w-6 h-4 border border-gray-100" />
                    </div>
                    <div className="mx-4 bg-gray-100 px-3 py-1 rounded-lg font-black text-black text-lg">
                      {bet.homeScore} × {bet.awayScore}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <img src={getFlagUrl(game.awayTeam)} className="w-6 h-4 border border-gray-100" />
                      <span className="text-xs font-bold text-black truncate">{game.awayTeam}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-block bg-black text-white px-10 py-4 rounded-xl font-black hover:bg-gray-800 uppercase">
            Editar minha cartela
          </Link>
        </div>
      </main>
    </>
  )
}

function Row({ label, value, flag, isPlayer }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-xs font-black text-gray-500 uppercase">{label}</span>
      <div className="flex items-center gap-2">
        {flag && !isPlayer && <img src={flag} className="w-6 h-4 border border-gray-100" />}
        <span className="text-base font-black text-black uppercase">{value || '---'}</span>
      </div>
    </div>
  )
}