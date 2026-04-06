'use client'

import { SpecialBets } from '@/lib/types'

interface Team {
  name: string
  flag: string
}

interface Props {
  specials: Partial<SpecialBets>
  allTeams: Team[]
  onChange: (specials: Partial<SpecialBets>) => void
}

function SectionCard({
  icon,
  title,
  points,
  children,
}: {
  icon: string
  title: string
  points: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-green-700 font-semibold mt-0.5">{points}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

function TeamSelect({
  label,
  value,
  teams,
  exclude,
  onChange,
}: {
  label: string
  value: string
  teams: Team[]
  exclude?: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
      >
        <option value="">Selecione a seleção...</option>
        {teams
          .filter(t => t.name !== exclude)
          .map(team => (
            <option key={team.name} value={team.name}>
              {team.flag} {team.name}
            </option>
          ))}
      </select>
    </div>
  )
}

function PlayerInput({
  label,
  value,
  placeholder,
  hint,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  hint?: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
      />
      {hint && <p className="text-xs text-gray-400 mt-2">{hint}</p>}
    </div>
  )
}

export default function EspeciaisTab({ specials, allTeams, onChange }: Props) {
  function update(key: keyof SpecialBets, val: string) {
    onChange({ ...specials, [key]: val })
  }

  const filledCount = [
    specials.champion,
    specials.runnerUp,
    specials.topScorer,
    specials.bestPlayer,
    specials.lastPlace,
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Apostas especiais antes do início da Copa.</p>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            filledCount === 5
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {filledCount}/5 preenchidos
        </span>
      </div>

      {/* Campeão */}
      <SectionCard icon="🥇" title="Campeão" points="50 pontos se acertar">
        <TeamSelect
          label=""
          value={specials.champion ?? ''}
          teams={allTeams}
          exclude={specials.runnerUp}
          onChange={val => update('champion', val)}
        />
        {specials.runnerUp && specials.champion === specials.runnerUp && (
          <p className="text-xs text-red-500 mt-1">Campeão e vice não podem ser a mesma seleção.</p>
        )}
      </SectionCard>

      {/* Vice-campeão */}
      <SectionCard icon="🥈" title="Vice-campeão" points="35 pts (ou 30 pts se for o campeão)">
        <TeamSelect
          label=""
          value={specials.runnerUp ?? ''}
          teams={allTeams}
          exclude={specials.champion}
          onChange={val => update('runnerUp', val)}
        />
      </SectionCard>

      {/* Goleador */}
      <SectionCard
        icon="⚽"
        title="Goleador"
        points="2 pts por gol + 13 pts de bônus se for o artilheiro"
      >
        <PlayerInput
          label=""
          value={specials.topScorer ?? ''}
          placeholder="Ex: Kylian Mbappé"
          hint="Gols na prorrogação contam. Gols em pênaltis (disputa) não contam."
          onChange={val => update('topScorer', val)}
        />
      </SectionCard>

      {/* Melhor jogador */}
      <SectionCard icon="⭐" title="Melhor jogador da Copa" points="15 pontos se acertar">
        <PlayerInput
          label=""
          value={specials.bestPlayer ?? ''}
          placeholder="Ex: Vinícius Jr."
          hint="Definido pela FIFA ao encerramento do torneio."
          onChange={val => update('bestPlayer', val)}
        />
      </SectionCard>

      {/* Último colocado */}
      <SectionCard
        icon="🔴"
        title="Última colocada da 1ª fase"
        points="8 pontos se acertar"
      >
        <TeamSelect
          label=""
          value={specials.lastPlace ?? ''}
          teams={allTeams}
          onChange={val => update('lastPlace', val)}
        />
        <p className="text-xs text-gray-400 mt-2">
          Pior seleção da fase de grupos segundo os critérios da FIFA.
        </p>
      </SectionCard>
    </div>
  )
}
