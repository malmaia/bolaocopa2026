'use client'

import { GroupPrediction } from '@/lib/types'

interface Team {
  name: string
  flag: string
}

interface Props {
  teamsByGroup: Record<string, Team[]>
  groupPredictions: Record<string, GroupPrediction>
  thirdPlace: string[]
  oitavas: string[]
  quartas: string[]
  semi: string[]
  onGroupPredictionChange: (group: string, field: 'first' | 'second', value: string) => void
  onThirdPlaceChange: (teams: string[]) => void
  onOitavasChange: (teams: string[]) => void
  onQuartasChange: (teams: string[]) => void
  onSemiChange: (teams: string[]) => void
}

// ── Team pill picker ───────────────────────────────────────────────────────

function TeamPicker({
  title,
  description,
  allTeams,
  selected,
  max,
  onChange,
}: {
  title: string
  description: string
  allTeams: Team[]
  selected: string[]
  max: number
  onChange: (teams: string[]) => void
}) {
  function toggle(teamName: string) {
    if (selected.includes(teamName)) {
      onChange(selected.filter(t => t !== teamName))
    } else if (selected.length < max) {
      onChange([...selected, teamName])
    }
  }

  const isComplete = selected.length === max

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
            isComplete
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {selected.length}/{max}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTeams.map(team => {
          const isSelected = selected.includes(team.name)
          const atMax = selected.length >= max && !isSelected
          return (
            <button
              key={team.name}
              onClick={() => toggle(team.name)}
              disabled={atMax}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                isSelected
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : atMax
                  ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-700'
              }`}
            >
              <span className="text-base leading-none">{team.flag}</span>
              <span>{team.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Section header ─────────────────────────────────────────────────────────

function SectionTitle({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold text-gray-700 mb-4 pb-2 border-b-2 border-green-500 flex items-center gap-2">
      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
        {number}
      </span>
      {children}
    </h2>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ClassificadosTab({
  teamsByGroup,
  groupPredictions,
  thirdPlace,
  oitavas,
  quartas,
  semi,
  onGroupPredictionChange,
  onThirdPlaceChange,
  onOitavasChange,
  onQuartasChange,
  onSemiChange,
}: Props) {
  const groupNames = Object.keys(teamsByGroup)

  const allTeams = Object.values(teamsByGroup)
    .flat()
    .reduce<Team[]>((acc, team) => {
      if (!acc.find(t => t.name === team.name)) acc.push(team)
      return acc
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

  const groupsDone = groupNames.filter(
    g => groupPredictions[g]?.first && groupPredictions[g]?.second
  ).length

  return (
    <div className="space-y-10">
      {/* ── Seção 1: 1º e 2º de cada grupo ─────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle number={1}>1º e 2º de cada grupo</SectionTitle>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            Indique quem termina em cada posição em cada grupo.
          </p>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
            groupsDone === groupNames.length
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}>
            {groupsDone}/{groupNames.length} grupos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groupNames.map(group => {
            const teams = teamsByGroup[group]
            const pred = groupPredictions[group]
            const isComplete = !!(pred?.first && pred?.second)

            return (
              <div
                key={group}
                className={`bg-white rounded-xl border p-4 transition-colors ${
                  isComplete ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-800 text-sm">{group}</span>
                  {isComplete && (
                    <span className="text-green-500 text-sm font-bold">✓</span>
                  )}
                </div>
                <div className="space-y-2">
                  {(['first', 'second'] as const).map((pos, i) => (
                    <div key={pos} className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          i === 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {i + 1}º
                      </span>
                      <select
                        value={pred?.[pos] ?? ''}
                        onChange={e => onGroupPredictionChange(group, pos, e.target.value)}
                        className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      >
                        <option value="">Selecione...</option>
                        {teams.map(team => (
                          <option
                            key={team.name}
                            value={team.name}
                            disabled={
                              (pos === 'first' && pred?.second === team.name) ||
                              (pos === 'second' && pred?.first === team.name)
                            }
                          >
                            {team.flag} {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Seção 2: 8 terceiros classificados ──────────────────────────── */}
      <section>
        <SectionTitle number={2}>8 terceiros classificados</SectionTitle>
        <p className="text-sm text-gray-500 mb-4">
          Dos 12 grupos, 8 terceiros colocados avançam. Quais você aposta que passam?
        </p>
        <TeamPicker
          title="Selecione as 8 seleções 3ªs colocadas que avançam"
          description="Clique para selecionar, clique novamente para remover"
          allTeams={allTeams}
          selected={thirdPlace}
          max={8}
          onChange={onThirdPlaceChange}
        />
      </section>

      {/* ── Seção 3: Fase eliminatória ───────────────────────────────────── */}
      <section>
        <SectionTitle number={3}>Fase eliminatória</SectionTitle>
        <p className="text-sm text-gray-500 mb-4">
          Indique quais seleções chegam a cada fase do mata-mata.
        </p>
        <div className="space-y-4">
          <TeamPicker
            title="Oitavas de final — 16 seleções"
            description="Quem você aposta que chega às oitavas?"
            allTeams={allTeams}
            selected={oitavas}
            max={16}
            onChange={onOitavasChange}
          />
          <TeamPicker
            title="Quartas de final — 8 seleções"
            description="Quem você aposta que chega às quartas?"
            allTeams={allTeams}
            selected={quartas}
            max={8}
            onChange={onQuartasChange}
          />
          <TeamPicker
            title="Semifinalistas — 4 seleções"
            description="Quem você aposta que chega às semifinais?"
            allTeams={allTeams}
            selected={semi}
            max={4}
            onChange={onSemiChange}
          />
        </div>
      </section>
    </div>
  )
}
