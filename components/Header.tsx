import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">⚽ Bolão Copa 2026</h1>
          <p className="text-green-200 text-xs mt-0.5">Faça seus palpites!</p>
        </div>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-white hover:text-green-200 text-sm font-medium transition-colors"
          >
            Palpites
          </Link>
          <Link
            href="/ranking"
            className="text-white hover:text-green-200 text-sm font-medium transition-colors"
          >
            Meus Palpites
          </Link>
        </nav>
      </div>
    </header>
  )
}
