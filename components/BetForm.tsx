'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GAMES } from '@/lib/games-data'
import { Bet, PlayerBets } from '@/lib/types'
import GameCard from './GameCard'

const STORAGE_KEY = 'bolao2026_bets'

export default function BetForm() {
  const [playerName, setPlayerName] = useState('')
  const [bets, setBets] = useState<Record<string, Bet>>({})
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Carrega palpites salvos ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data: PlayerBets = JSON.parse(stored)
      setPlayerName(data.playerName)
      const betsMap: Record<string, Bet> = {}
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
    setSaved(false)
  }

  function handleSave() {
    if (!playerName.trim()) {
      alert('Digite seu nome antes de salvar!')
      return
    }
    const playerBets: PlayerBets = {
      playerName: playerName.trim(),
      bets: Object.values(bets),
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playerBets))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const filledCount = Object.values(bets).filter(
    b => b.homeScore !== null && b.awayScore !== null
  ).length

  // Agrupa jogos por grupo
  const groups = [...new Set(GAMES.map(g => g.group))]

  if (!loaded) return null

  return (
    <div>
      {/* Nome do participante */}
      <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seu nome no bolão
        </label>
        <input
          type="text"
          value={playerName}
          onChange={e => {
            setPlayerName(e.target.value)
            setSaved(false)
          }}
          placeholder="Ex: João Silva"
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        />
      </div>

      {/* Progresso */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>
          <span className="font-semibold text-green-700">{filledCount}</span> de{' '}
          <span className="font-semibold">{GAMES.length}</span> jogos palpitados
        </span>
        <Link href="/ranking" className="text-green-700 font-medium hover:underline">
          Ver meus palpites →
        </Link>
      </div>

      {/* Jogos agrupados */}
      {groups.map(group => (
        <div key={group} className="mb-8">
          <h2 className="text-base font-bold text-gray-700 mb-3 pb-2 border-b-2 border-green-500 flex items-center gap-2">
            <span className="text-green-600">▸</span>
            {group}
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

      {/* Botão salvar fixo na base */}
      <div className="sticky bottom-4 mt-4 pb-2">
        <button
          onClick={handleSave}
          className={`w-full py-4 font-bold text-base rounded-xl shadow-lg transition-all ${
            saved
              ? 'bg-green-500 text-white scale-[0.99]'
              : 'bg-green-700 text-white hover:bg-green-800 active:scale-[0.99]'
          }`}
        >
          {saved ? '✓ Palpites salvos com sucesso!' : 'Salvar palpites'}
        </button>
      </div>
    </div>
  )
}
