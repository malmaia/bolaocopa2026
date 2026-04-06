export default function MataMataTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-5">
        🔒
      </div>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Mata-mata bloqueado</h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        Os palpites dos jogos do mata-mata serão liberados após o encerramento da fase de grupos,
        quando as chaves estiverem definidas.
      </p>
      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 max-w-xs text-left">
        <p className="text-xs font-semibold text-green-800 mb-1">Como vai funcionar:</p>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• Você poderá palpitar em cada jogo individualmente</li>
          <li>• O prazo é até 1h antes do início de cada partida</li>
          <li>• Se esquecer, o sistema registra 0×0 automaticamente</li>
          <li>• Vale placar exato (6 pts) e resultado correto (3 pts)</li>
        </ul>
      </div>
    </div>
  )
}
