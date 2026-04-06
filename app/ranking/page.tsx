'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { AllBets } from '@/lib/types'
import { GAMES } from '@/lib/games-data'

const STORAGE_KEY = 'bolao2026_v2'

export default function RankingPage() {
  const [bets, setBets] = useState<AllBets | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setBets(JSON.parse(stored))
      } catch {
        // ignore
      }
    }
    setLoaded(true)
  }, [])

  if (!loaded) return null

  if (!bets) {
    return (
      <>
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-5xl mb-4">⚽</p>
          <p className="text-gray-600 text-lg mb-6">Nenhum palpite salvo ainda.</p>
          <Link
            href="/"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
          >
            Preencher cartela
          </Link>
        </main>
      </>
    )
  }

  const groupGames = GAMES.filter(g => g.phase === 'grupo')
  const filledGames = groupGames.filter(g => {
    const b = bets.gameBets[g.id]
    return b?.homeScore !== null && b?.awayScore !== null
  })

  const savedDate = new Date(bets.savedAt).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const groups = [...new Set(groupGames.map(g => g.group))]

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-20">

        {/* Card do participante */}
        <div className="bg-green-700 text-white rounded-xl p-5 mb-6 shadow-md">
          <p className="text-2xl font-bold">{bets.playerName || '—'}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-green-200 text-sm">
              {filledGames.length}/{groupGames.length} jogos · {[
                bets.specials.champion,
                bets.specials.runnerUp,
                bets.specials.topScorer,
                bets.specials.bestPlayer,
                bets.specials.lastPlace,
              ].filter(Boolean).length}/5 especiais
            </p>
            <p className="text-green-300 text-xs">{savedDate}</p>
          </div>
          <div className="mt-3 bg-green-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-white h-1.5 rounded-full"
              style={{ width: `${Math.round((filledGames.length / Math.max(groupGames.length, 1)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Palpites dos jogos */}
        <h2 className="text-base font-bold text-gray-700 mb-4">Placares — 1ª Fase</h2>
        {groups.map(group => (
          <div key={group} className="mb-6">
            <h3 className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
              <span className="text-green-600">▸</span>{group}
            </h3>
            <div className="space-y-2">
              {groupGames.filter(g => g.group === group).map(game => {
                const bet = bets.gameBets[game.id]
                const hasBet = bet?.homeScore !== null && bet?.awayScore !== null && bet !== undefined
                return (
                  <div
                    key={game.id}
                    className={`bg-white rounded-xl border p-3 ${
                      hasBet ? 'border-gray-200' : 'border-dashed border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center justify-end gap-1.5 min-w-0">
                        <span className="text-sm font-medium text-gray-900 truncate">{game.homeTeam}</span>
                        <span>{game.homeFlag}</span>
                      </div>
                      <div className="w-20 text-center flex-shrink-0">
                        {hasBet ? (
                          <span className="font-bold text-gray-900">{bet.homeScore} × {bet.awayScore}</span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">sem palpite</span>
                        )}
                      </div>
                      <div className="flex-1 flex items-center gap-1.5 min-w-0">
                        <span>{game.awayFlag}</span>
                        <span className="text-sm font-medium text-gray-900 truncate">{game.awayTeam}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Especiais */}
        {Object.values(bets.specials).some(Boolean) && (
          <div className="mt-6">
            <h2 className="text-base font-bold text-gray-700 mb-4">Apostas especiais</h2>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {bets.specials.champion && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">🥇 Campeão</span>
                  <span className="text-sm font-semibold text-gray-900">{bets.specials.champion}</span>
                </div>
              )}
              {bets.specials.runnerUp && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">🥈 Vice-campeão</span>
                  <span className="text-sm font-semibold text-gray-900">{bets.specials.runnerUp}</span>
                </div>
              )}
              {bets.specials.topScorer && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">⚽ Goleador</span>
                  <span className="text-sm font-semibold text-gray-900">{bets.specials.topScorer}</span>
                </div>
              )}
              {bets.specials.bestPlayer && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">⭐ Melhor jogador</span>
                  <span className="text-sm font-semibold text-gray-900">{bets.specials.bestPlayer}</span>
                </div>
              )}
              {bets.specials.lastPlace && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">🔴 Último colocado</span>
                  <span className="text-sm font-semibold text-gray-900">{bets.specials.lastPlace}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
          >
            Editar cartela
          </Link>
        </div>
      </main>
    </>
  )
}
