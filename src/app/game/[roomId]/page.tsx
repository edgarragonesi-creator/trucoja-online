'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card as CardType, GameState, Player, ChatMessage } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Send, Users } from 'lucide-react'
import { trucoEngine } from '@/lib/game-engine'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.roomId as string

  const [gameState, setGameState] = useState<GameState | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)

  useEffect(() => {
    // Inicializar jogo mock
    initializeMockGame()
  }, [])

  function initializeMockGame() {
    // Criar jogadores mock
    const mockPlayers: Player[] = [
      {
        id: '1',
        user_id: 'user1',
        username: 'Você',
        position: 0,
        team: 1,
        cards: [],
        score: 0
      },
      {
        id: '2',
        user_id: 'user2',
        username: 'João',
        position: 1,
        team: 2,
        cards: [],
        score: 0
      },
      {
        id: '3',
        user_id: 'user3',
        username: 'Maria',
        position: 2,
        team: 1,
        cards: [],
        score: 0
      },
      {
        id: '4',
        user_id: 'user4',
        username: 'Pedro',
        position: 3,
        team: 2,
        cards: [],
        score: 0
      }
    ]

    // Distribuir cartas
    const { players, vira, deck } = trucoEngine.dealCards(mockPlayers)
    const manilhas = trucoEngine.calculateManilhas(vira)

    const initialState: GameState = {
      room_id: roomId,
      players,
      current_round: 1,
      current_turn: 0,
      table_cards: [],
      truco_value: 1,
      team1_score: 0,
      team2_score: 0,
      vira,
      manilhas
    }

    setGameState(initialState)
    setCurrentPlayer(players[0])
  }

  function handlePlayCard(card: CardType) {
    if (!gameState || !currentPlayer) return

    // Validar jogada
    const validation = trucoEngine.validatePlay(currentPlayer.id, card, gameState)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    // Adicionar carta na mesa
    const newTableCards = [
      ...gameState.table_cards,
      { player_id: currentPlayer.id, card }
    ]

    // Remover carta da mão
    const updatedPlayers = gameState.players.map(p =>
      p.id === currentPlayer.id
        ? { ...p, cards: p.cards.filter(c => c.suit !== card.suit || c.value !== card.value) }
        : p
    )

    setGameState({
      ...gameState,
      table_cards: newTableCards,
      players: updatedPlayers,
      current_turn: gameState.current_turn + 1
    })

    setSelectedCard(null)
  }

  function handleTruco() {
    if (!gameState) return
    
    setGameState({
      ...gameState,
      truco_pending: true,
      truco_caller: currentPlayer?.id
    })
  }

  function handleSendMessage() {
    if (!chatInput.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      room_id: roomId,
      user_id: currentPlayer?.user_id || '',
      username: currentPlayer?.username || 'Você',
      message: chatInput,
      timestamp: new Date().toISOString()
    }

    setChatMessages([...chatMessages, newMessage])
    setChatInput('')
  }

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Carregando jogo...</div>
      </div>
    )
  }

  const isMyTurn = gameState.players[gameState.current_turn % gameState.players.length]?.id === currentPlayer?.id

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <Button
            variant="ghost"
            className="text-white hover:text-emerald-400"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sair
          </Button>

          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-900/50 text-emerald-300 border-emerald-700">
              Time 1: {gameState.team1_score} pontos
            </Badge>
            <Badge className="bg-blue-900/50 text-blue-300 border-blue-700">
              Time 2: {gameState.team2_score} pontos
            </Badge>
          </div>

          <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
            Rodada {gameState.current_round}
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Mesa de Jogo */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              {/* Vira */}
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-2">Vira</p>
                <div className="inline-block bg-white rounded-lg p-4 shadow-xl">
                  <div className="text-4xl font-bold text-slate-900">
                    {gameState.vira?.display}
                  </div>
                </div>
              </div>

              {/* Mesa (cartas jogadas) */}
              <div className="min-h-[200px] bg-emerald-900/20 rounded-xl p-6 mb-6 flex items-center justify-center gap-4">
                {gameState.table_cards.length === 0 ? (
                  <p className="text-slate-400">Aguardando jogadas...</p>
                ) : (
                  gameState.table_cards.map((tc, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-xl">
                      <div className="text-3xl font-bold text-slate-900">
                        {tc.card.display}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 text-center">
                        {gameState.players.find(p => p.id === tc.player_id)?.username}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Ações */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white"
                  onClick={handleTruco}
                  disabled={!isMyTurn || gameState.truco_pending}
                >
                  Truco!
                </Button>
                <Button
                  variant="outline"
                  className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                  disabled={!isMyTurn}
                >
                  Correr
                </Button>
              </div>

              {/* Suas cartas */}
              <div>
                <p className="text-white text-sm mb-3 text-center">
                  {isMyTurn ? '🎯 Sua vez! Escolha uma carta' : 'Aguardando outros jogadores...'}
                </p>
                <div className="flex items-center justify-center gap-4">
                  {currentPlayer?.cards.map((card, idx) => (
                    <button
                      key={idx}
                      onClick={() => isMyTurn && handlePlayCard(card)}
                      disabled={!isMyTurn}
                      className={`bg-white rounded-lg p-6 shadow-xl transition-all hover:scale-110 hover:shadow-2xl ${
                        !isMyTurn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      } ${
                        selectedCard === card ? 'ring-4 ring-emerald-500' : ''
                      }`}
                    >
                      <div className="text-4xl font-bold text-slate-900">
                        {card.display}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jogadores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {gameState.players.map((player) => (
              <Card
                key={player.id}
                className={`bg-slate-800/50 border-slate-700 ${
                  player.id === currentPlayer?.id ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      player.team === 1 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`} />
                    <p className="text-white font-semibold text-sm">{player.username}</p>
                  </div>
                  <p className="text-slate-400 text-xs">
                    {player.cards.length} cartas
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 h-[600px] flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-semibold">Chat da Sala</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-emerald-400 text-sm font-semibold mb-1">
                      {msg.username}
                    </p>
                    <p className="text-white text-sm">{msg.message}</p>
                  </div>
                ))}
                {chatMessages.length === 0 && (
                  <p className="text-slate-400 text-sm text-center">
                    Nenhuma mensagem ainda
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Digite uma mensagem..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
