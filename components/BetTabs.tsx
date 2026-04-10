'use client'

import { useState, useEffect } from 'react'
import { AllBets, GameBet, TabId } from '@/lib/types'
import { GAMES, getTeamsByGroup, getAllTeams } from '@/lib/games-data'
import { supabase } from '@/lib/supabase' // Importando a conexão
import JogosTab from './tabs/JogosTab'
import ClassificadosTab from './tabs/ClassificadosTab'
import EspeciaisTab from './tabs/EspeciaisTab'
import MataMataTab from './tabs/MataMataTab'

const STORAGE_KEY = 'bolao2026_v2'

const EMPTY_BETS: AllBets = {
  playerName: '',
  gameBets: {},
  groupPredictions: {},
  thirdPlace: [],
  oitavas: [],
  quartas: [],
  semi: [],
  specials: {},
  savedAt: '',
}

const TAB_META: Array<{ id: TabId; label: string; locked?: boolean }> = [
  { id: 'jogos', label: 'Jogos' },
  { id: 'classificados', label: 'Classificados' },
  { id: 'especiais', label: 'Especiais' },
  { id: 'mata-mata', label: 'Mata-mata', locked: true },
]

export default function BetTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('jogos')
  const [bets, setBets] = useState<AllBets>(EMPTY_BETS)
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setBets(JSON.parse(stored))
      } catch (e) {
        console.error('Erro ao carregar do LocalStorage:', e)
      }
    }
    setLoaded(true)
  }, [])

  async function handleSave() {
    if (!bets.playerName) {
      alert('Por favor, digite seu nome antes de salvar!')
      return
    }

    const now = new Date().toISOString()
    const updatedBets = { ...bets, savedAt: now }

    // 1. Salva no navegador (Backup rápido)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBets))

    // 2. Salva no Supabase (Banco de Dados Real)
    try {
      const { error } = await supabase
        .from('bets')
        .insert([
          { 
            player_name: bets.playerName, 
            bet_data: updatedBets 
          }
        ])

      if (error) throw error
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar no Supabase:', error)
      alert('Erro ao salvar na nuvem. Verifique sua conexão.')
    }
  }

  function handlePlayerNameChange(name: string) {
    setBets(prev => ({ ...prev, playerName: name }))
  }

  function handleBetChange(gameId: string, field: 'homeScore' | 'awayScore', value: string) {
    const numValue = value === '' ? null : Math.max(0, parseInt(value, 10))
    setBets(prev => ({
      ...prev,
      gameBets: {
        ...prev.gameBets,
        [gameId]: {
          gameId,
          homeScore: field === 'homeScore' ? numValue : (prev.gameBets[gameId]?.homeScore ?? null),
          awayScore: field === 'awayScore' ? numValue : (prev.gameBets[gameId]?.awayScore ?? null),
        },
      },
    }))
  }

  if (!loaded) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
      <div className="bg-white rounded-xl border-4 border-green-700 p-5 mb-8 shadow-md">
        <label className="block text-sm font-black text-green-900 mb-2 uppercase tracking-wider">
          Nome do Participante
        </label>
        <input
          type="text"
          value={bets.playerName}
          onChange={e => handlePlayerNameChange(e.target.value)}
          placeholder="Digite seu nome completo..."
          className="w-full p-4 text-xl font-black text-black border-2 border-gray-400 rounded-xl focus:border-green-600 outline-none placeholder:text-gray-300"
        />
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        {TAB_META.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.locked && setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-green-700 shadow-sm'
                : tab.locked
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.locked ? `🔒 ${tab.label}` : tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'jogos' && (
          <JogosTab gameBets={bets.gameBets} onBetChange={handleBetChange} />
        )}
        {activeTab === 'classificados' && (
          <ClassificadosTab
            teamsByGroup={getTeamsByGroup()}
            groupPredictions={bets.groupPredictions}
            thirdPlace={bets.thirdPlace}
            oitavas={bets.oitavas}
            quartas={bets.quartas}
            semi={bets.semi}
            onGroupPredictionChange={(group, field, val) =>
              setBets(prev => ({
                ...prev,
                groupPredictions: {
                  ...prev.groupPredictions,
                  [group]: { ...prev.groupPredictions[group], [field]: val },
                },
              }))
            }
            onThirdPlaceChange={teams => setBets(prev => ({ ...prev, thirdPlace: teams }))}
            onOitavasChange={teams => setBets(prev => ({ ...prev, oitavas: teams }))}
            onQuartasChange={teams => setBets(prev => ({ ...prev, quartas: teams }))}
            onSemiChange={teams => setBets(prev => ({ ...prev, semi: teams }))}
          />
        )}
        {activeTab === 'especiais' && (
          <EspeciaisTab
            specials={bets.specials}
            allTeams={getAllTeams()}
            onChange={specials => setBets(prev => ({ ...prev, specials }))}
          />
        )}
        {activeTab === 'mata-mata' && <MataMataTab />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`flex-1 py-4 font-black text-base rounded-xl transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {saved ? '✓ PALPITES ENVIADOS PARA A NUVEM!' : 'SALVAR MINHA CARTELA'}
          </button>
        </div>
      </div>
    </div>
  )
}