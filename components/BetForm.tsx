'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GAMES } from '@/lib/games-data'
import { GameBet, PlayerBets } from '@/lib/types'
import GameCard from './GameCard'

const STORAGE_KEY = 'bolao2026_bets'

export default function BetForm() {
  const [playerName, setPlayerName] = useState('')
  const [bets, setBets] = useState<Record<string, GameBet>>({})
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data: PlayerBets = JSON.parse(stored)
      setPlayerName(data.playerName)
      const betsMap: Record<string, GameBet> = {}
      data.bets.forEach(b => {
        betsMap[b.gameId] = b
      })
      setBets(betsMap)
    }
    setLoaded(true)
  }, [])

  function handleBetChange(gameId: string, field: 'homeScore' | 'awayScore', value: string) {
    const numValue = value === '' ? null : Math.max(0, parseInt(value, 10))
    setBets(prev => ({
      ...prev,
      [gameId]: {
        gameId,
        homeScore: field === 'homeScore' ? numValue : (prev[gameId]?.homeScore ?? null),
        awayScore: field === 'awayScore' ? numValue : (prev[gameId]?.awayScore ?? null),
      },
    }))
  }

  function handleSave() {
    const betsArray = Object.values(bets)
    const data: PlayerBets = { playerName, bets: betsArray, savedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!loaded) return null

  const groups = [...new Set(GAMES.filter(g => g.phase === 'grupo').map(g => g.group))]
  const filledCount = Object.values(bets).filter(b => b.homeScore !== null && b.awayScore !== null).length

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8 shadow-sm">
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Seu Nome</label>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          placeholder="Ex: João Silva"
          className="w-full p-3 text-lg font-bold border-2 border-gray-300 rounded-xl focus:border-green-500 outline-none text-black"
        />
      </div>

      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-sm text-gray-500 font-bold">
          <span className="text-green-700">{filledCount}</span> de {GAMES.length} jogos palpitados
        </span>
        <Link href="/ranking" className="text-green-700 font-black hover:underline uppercase text-xs">
          Ver meus palpites →
        </Link>
      </div>

      {groups.map(group => (
        <div key={group} className="mb-8">
          <h2 className="text-base font-black text-black mb-3 pb-2 border-b-2 border-green-500 uppercase flex items-center gap-2">
            <span className="text-green-600">▸</span> {group}
          </h2>
          <div className="space-y-3">
            {GAMES.filter(g => g.group === group).map(game => (
              <GameCard
                key={game.id}
                game={game}
                bet={bets[game.id]}
                onBetChange={handleBetChange}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-50">
        <button
          onClick={handleSave}
          className={`w-full py-4 font-black text-lg rounded-2xl shadow-2xl transition-all ${
            saved ? 'bg-green-500 text-white' : 'bg-green-700 text-white hover:bg-green-800'
          }`}
        >
          {saved ? '✓ PALPITES SALVOS!' : 'SALVAR MINHA CARTELA'}
        </button>
      </div>
    </div>
  )
}