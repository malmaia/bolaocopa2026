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

const getFlagUrl = (name: string) => `https://flagcdn.com/w40/${TEAM_CODES[name] || 'un'}.png`;

function TeamPicker({ title, description, allTeams, selected, max, onChange }: any) {
  function toggle(teamName: string) {
    if (selected.includes(teamName)) {
      onChange(selected.filter((t: any) => t !== teamName))
    } else if (selected.length < max) {
      onChange([...selected, teamName])
    }
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-black text-black text-sm">{title}</h4>
          <p className="text-[10px] text-gray-500 font-bold uppercase">{description}</p>
        </div>
        <span className={`text-xs font-black ${selected.length === max ? 'text-green-600' : 'text-orange-500'}`}>
          {selected.length}/{max}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTeams.map((team: any) => (
          <button
            key={team.name}
            onClick={() => toggle(team.name)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black border-2 transition-all ${
              selected.includes(team.name)
                ? 'bg-green-600 border-green-700 text-white'
                : 'bg-gray-50 border-gray-300 text-black hover:border-gray-400'
            }`}
          >
            <img src={getFlagUrl(team.name)} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
            {team.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-black text-lg">{number}</div>
      <h3 className="text-xl font-black text-black uppercase">{children}</h3>
    </div>
  )
}

export default function ClassificadosTab({ teamsByGroup, groupPredictions, thirdPlace, oitavas, quartas, semi, onGroupPredictionChange, onThirdPlaceChange, onOitavasChange, onQuartasChange, onSemiChange }: Props) {
  const groups = Object.keys(teamsByGroup).sort()
  const allTeams = Object.values(teamsByGroup).flat().sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="space-y-10 pb-10">
      <section>
        <SectionTitle number={1}>Classificação dos Grupos</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(group => (
            <div key={group} className="bg-white p-4 rounded-xl border-2 border-gray-200">
              <h4 className="font-black text-green-800 border-b-2 border-green-100 pb-2 mb-4">{group}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(['first', 'second'] as const).map(pos => (
                  <div key={pos}>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                      {pos === 'first' ? '1º Colocado' : '2º Colocado'}
                    </label>
                    <select
                      value={groupPredictions[group]?.[pos] ?? ''}
                      onChange={e => onGroupPredictionChange(group, pos, e.target.value)}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg text-xs font-black text-black bg-white focus:border-green-600 outline-none"
                    >
                      <option value="">--</option>
                      {teamsByGroup[group].map(t => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle number={2}>Melhores 3º colocados</SectionTitle>
        <TeamPicker title="Selecione as 8 seleções" description="Os 8 melhores terceiros" allTeams={allTeams} selected={thirdPlace} max={8} onChange={onThirdPlaceChange} />
      </section>

      <section>
        <SectionTitle number={3}>Caminho do Título</SectionTitle>
        <div className="space-y-4">
          <TeamPicker title="Oitavas de Final" description="16 seleções" allTeams={allTeams} selected={oitavas} max={16} onChange={onOitavasChange} />
          <TeamPicker title="Quartas de Final" description="8 seleções" allTeams={allTeams} selected={quartas} max={8} onChange={onQuartasChange} />
          <TeamPicker title="Semifinais" description="4 seleções" allTeams={allTeams} selected={semi} max={4} onChange={onSemiChange} />
        </div>
      </section>
    </div>
  )
}