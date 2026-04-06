'use client'

import { useState, useEffect, useMemo } from 'react'
import { AllBets, GameBet, TabId } from '@/lib/types'
import { GAMES, getTeamsByGroup, getAllTeams } from '@/lib/games-data'
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

// ── Tab config ─────────────────────────────────────────────────────────────

const TAB_META: Array<{ id: TabId; label: string; locked?: boolean }> = [
  { id: 'jogos', label: 'Jogos' },
  { id: 'classificados', label: 'Classificados' },
  { id: 'especiais', label: 'Especiais' },
  { id: 'mata-mata', label: 'Mata-mata', locked: true },
]

// ── Component ──────────────────────────────────────────────────────────────

export default function BetTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('jogos')
  const [bets, setBets] = useState<AllBets>(EMPTY_BETS)
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const teamsByGroup = useMemo(() => getTeamsByGroup(), [])
  const allTeams = useMemo(() => getAllTeams(), [])
  const groupNames = useMemo(() => Object.keys(teamsByGroup), [teamsByGroup])

  // Load from localStorage (with migration from v1 format)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setBets({ ...EMPTY_BETS, ...JSON.parse(stored) })
      } catch {
        // ignore
      }
    }
    setLoaded(true)
  }, [])

  function updateBets(partial: Partial<AllBets>) {
    setBets(prev => ({ ...prev, ...partial }))
    setSaved(false)
  }

  function handleGameBet(gameId: string, field: 'homeScore' | 'awayScore', value: string) {
    const numValue = value === '' ? null : Math.max(0, parseInt(value, 10))
    setBets(prev => ({
      ...prev,
      gameBets: {
        ...prev.gameBets,
        [gameId]: {
          gameId,
          homeScore: field === 'homeScore' ? numValue : (prev.gameBets[gameId]?.homeScore ?? null),
          awayScore: field === 'awayScore' ? numValue : (prev.gameBets[gameId]?.awayScore ?? null),
        } as GameBet,
      },
    }))
    setSaved(false)
  }

  function handleSave() {
    if (!bets.playerName.trim()) {
      alert('Digite seu nome antes de salvar!')
      return
    }
    const toSave: AllBets = { ...bets, savedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // ── Completion tracking ──────────────────────────────────────────────────

  const completion = useMemo(() => {
    const gamesTotal = GAMES.filter(g => g.phase === 'grupo').length
    const gamesFilled = Object.values(bets.gameBets).filter(
      b => b.homeScore !== null && b.awayScore !== null
    ).length

    const groupsFilled = groupNames.filter(
      g => bets.groupPredictions[g]?.first && bets.groupPredictions[g]?.second
    ).length
    const classifTotal = groupNames.length + 4
    const classifFilled =
      groupsFilled +
      (bets.thirdPlace.length === 8 ? 1 : 0) +
      (bets.oitavas.length === 16 ? 1 : 0) +
      (bets.quartas.length === 8 ? 1 : 0) +
      (bets.semi.length === 4 ? 1 : 0)

    const specialsFilled = [
      bets.specials.champion,
      bets.specials.runnerUp,
      bets.specials.topScorer,
      bets.specials.bestPlayer,
      bets.specials.lastPlace,
    ].filter(Boolean).length

    return {
      jogos: { filled: gamesFilled, total: gamesTotal },
      classificados: { filled: classifFilled, total: classifTotal },
      especiais: { filled: specialsFilled, total: 5 },
    }
  }, [bets, groupNames])

  const overallPct = useMemo(() => {
    const total =
      completion.jogos.total +
      completion.classificados.total +
      completion.especiais.total
    const filled =
      completion.jogos.filled +
      completion.classificados.filled +
      completion.especiais.filled
    return total > 0 ? Math.round((filled / total) * 100) : 0
  }, [completion])

  // ── Tab list with live progress ──────────────────────────────────────────

  const tabs = TAB_META.map((tab, i) => {
    const c =
      tab.id === 'jogos'
        ? completion.jogos
        : tab.id === 'classificados'
        ? completion.classificados
        : tab.id === 'especiais'
        ? completion.especiais
        : null

    const filled = c?.filled ?? 0
    const total = c?.total ?? 0
    const complete = !tab.locked && total > 0 && filled === total
    const progress = tab.locked ? 'bloqueado' : `${filled}/${total}`

    return { ...tab, index: i, filled, total, complete, progress }
  })

  const activeIndex = tabs.findIndex(t => t.id === activeTab)

  function goTo(id: TabId) {
    const tab = tabs.find(t => t.id === id)
    if (tab && !tab.locked) setActiveTab(id)
  }

  if (!loaded) return null

  return (
    <div>
      {/* ── Name + overall progress ──────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={bets.playerName}
              onChange={e => updateBets({ playerName: e.target.value })}
              placeholder="Seu nome no bolão"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition"
            />
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex-shrink-0 ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-green-700 text-white hover:bg-green-800 active:scale-[0.97]'
              }`}
            >
              {saved ? '✓ Salvo!' : 'Salvar'}
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap font-medium">
              {overallPct}% preenchida
            </span>
          </div>
        </div>
      </div>

      {/* ── Tab navigation bar ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map(tab => {
              const isActive = tab.id === activeTab

              return (
                <button
                  key={tab.id}
                  onClick={() => goTo(tab.id)}
                  disabled={!!tab.locked}
                  className={`flex flex-col items-center gap-0.5 px-5 py-3 border-b-2 transition-colors min-w-[90px] ${
                    isActive
                      ? 'border-green-600 text-green-700'
                      : tab.locked
                      ? 'border-transparent text-gray-300 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {/* Step circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      tab.complete
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-green-700 text-white'
                        : tab.locked
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {tab.complete ? '✓' : tab.locked ? '🔒' : tab.index + 1}
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold leading-tight">{tab.label}</span>

                  {/* Progress count */}
                  <span
                    className={`text-xs leading-tight ${
                      tab.complete
                        ? 'text-green-600 font-medium'
                        : !tab.locked && tab.filled > 0
                        ? 'text-amber-500 font-medium'
                        : 'text-gray-400'
                    }`}
                  >
                    {tab.progress}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-4 py-6 pb-28">
        {activeTab === 'jogos' && (
          <JogosTab gameBets={bets.gameBets} onBetChange={handleGameBet} />
        )}

        {activeTab === 'classificados' && (
          <ClassificadosTab
            teamsByGroup={teamsByGroup}
            groupPredictions={bets.groupPredictions}
            thirdPlace={bets.thirdPlace}
            oitavas={bets.oitavas}
            quartas={bets.quartas}
            semi={bets.semi}
            onGroupPredictionChange={(group, field, value) =>
              updateBets({
                groupPredictions: {
                  ...bets.groupPredictions,
                  [group]: { ...bets.groupPredictions[group], [field]: value },
                },
              })
            }
            onThirdPlaceChange={teams => updateBets({ thirdPlace: teams })}
            onOitavasChange={teams => updateBets({ oitavas: teams })}
            onQuartasChange={teams => updateBets({ quartas: teams })}
            onSemiChange={teams => updateBets({ semi: teams })}
          />
        )}

        {activeTab === 'especiais' && (
          <EspeciaisTab
            specials={bets.specials}
            allTeams={allTeams}
            onChange={specials => updateBets({ specials })}
          />
        )}

        {activeTab === 'mata-mata' && <MataMataTab />}
      </div>

      {/* ── Bottom navigation (fixed) ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          {/* Anterior */}
          {activeIndex > 0 ? (
            <button
              onClick={() => goTo(tabs[activeIndex - 1].id)}
              className="flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              ← {tabs[activeIndex - 1].label}
            </button>
          ) : (
            <div className="w-24 flex-shrink-0" />
          )}

          {/* Salvar (center) */}
          <button
            onClick={handleSave}
            className={`flex-1 py-2.5 font-bold text-sm rounded-xl transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-green-700 text-white hover:bg-green-800 active:scale-[0.98]'
            }`}
          >
            {saved ? '✓ Cartela salva!' : 'Salvar cartela'}
          </button>

          {/* Próxima */}
          {activeIndex < tabs.length - 1 && !tabs[activeIndex + 1].locked ? (
            <button
              onClick={() => goTo(tabs[activeIndex + 1].id)}
              className="flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              {tabs[activeIndex + 1].label} →
            </button>
          ) : (
            <div className="w-24 flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  )
}
