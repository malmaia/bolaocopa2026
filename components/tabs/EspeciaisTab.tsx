// Substitua o conteúdo de src/components/tabs/EspeciaisTab.tsx por este:
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
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-black text-black">{title}</h3>
            <p className="text-xs text-green-700 font-bold mt-0.5">{points}</p>
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
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-black font-bold focus:ring-2 focus:ring-green-500 outline-none appearance-none"
      >
        <option value="" className="text-gray-400">Selecione uma seleção...</option>
        {teams.map(team => (
          <option key={team.name} value={team.name} disabled={team.name === exclude} className="text-black font-bold">
            {team.name}
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
  hint: string
  onChange: (val: string) => void
}) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-gray-300 rounded-lg text-black font-black placeholder:text-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
      />
      {hint && <p className="mt-2 text-[11px] text-gray-500 font-medium italic">{hint}</p>}
    </div>
  )
}

export default function EspeciaisTab({ specials, allTeams, onChange }: Props) {
  const update = (field: keyof SpecialBets, value: string) => {
    onChange({ ...specials, [field]: value })
  }

  return (
    <div className="space-y-2 pb-10">
      <p className="text-sm text-gray-600 font-medium mb-6">
        Estas apostas devem ser feitas antes do início da Copa e valem muitos pontos!
      </p>

      {/* Finalistas */}
      <SectionCard icon="🏆" title="Grande Final" points="Campeão: 50 pts | Vice: 35 pts">
        <div className="grid grid-cols-1 gap-2">
          <TeamSelect
            label="Campeão"
            value={specials.champion ?? ''}
            teams={allTeams}
            exclude={specials.runnerUp}
            onChange={val => update('champion', val)}
          />
          <TeamSelect
            label="Vice-campeão"
            value={specials.runnerUp ?? ''}
            teams={allTeams}
            exclude={specials.champion}
            onChange={val => update('runnerUp', val)}
          />
        </div>
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
          hint="Gols na prorrogação contam. Gols em pênaltis não contam."
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
      </SectionCard>
    </div>
  )
}