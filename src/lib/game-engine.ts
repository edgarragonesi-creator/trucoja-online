import { Card, GameState, Player } from './types'

// Engine do jogo de Truco - Sistema autoritativo
export class TrucoEngine {
  private deck: Card[] = []
  
  // Criar baralho de truco (40 cartas - sem 8, 9 e coringas)
  createDeck(): Card[] {
    const suits: Card['suit'][] = ['ouros', 'espadas', 'copas', 'paus']
    const values: Card['value'][] = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
    const deck: Card[] = []
    
    for (const suit of suits) {
      for (const value of values) {
        deck.push({
          suit,
          value,
          display: this.getCardDisplay(value, suit)
        })
      }
    }
    
    return deck
  }
  
  // Fisher-Yates shuffle
  shuffle(deck: Card[]): Card[] {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  // Distribuir cartas (3 por jogador)
  dealCards(players: Player[]): { players: Player[]; vira: Card; deck: Card[] } {
    const deck = this.shuffle(this.createDeck())
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      cards: deck.slice(index * 3, (index + 1) * 3)
    }))
    
    const vira = deck[players.length * 3]
    const remainingDeck = deck.slice(players.length * 3 + 1)
    
    return { players: updatedPlayers, vira, deck: remainingDeck }
  }
  
  // Calcular manilhas baseado na vira
  calculateManilhas(vira: Card): Card[] {
    const manilhaValue = vira.value === 12 ? 1 : (vira.value + 1) as Card['value']
    const suits: Card['suit'][] = ['ouros', 'espadas', 'copas', 'paus']
    
    return suits.map(suit => ({
      suit,
      value: manilhaValue,
      display: this.getCardDisplay(manilhaValue, suit)
    }))
  }
  
  // Força da carta (considerando manilhas)
  getCardStrength(card: Card, manilhas: Card[]): number {
    // Verifica se é manilha
    const isManilha = manilhas.some(m => m.value === card.value)
    
    if (isManilha) {
      // Ordem das manilhas: Paus (4) > Copas (3) > Espadas (2) > Ouros (1)
      const manilhaOrder = { paus: 4, copas: 3, espadas: 2, ouros: 1 }
      return 100 + manilhaOrder[card.suit]
    }
    
    // Ordem normal: 3 > 2 > A > K > J > Q > 7 > 6 > 5 > 4
    const valueOrder: Record<number, number> = {
      3: 10, 2: 9, 1: 8, 12: 7, 11: 6, 10: 5, 7: 4, 6: 3, 5: 2, 4: 1
    }
    
    return valueOrder[card.value] || 0
  }
  
  // Comparar duas cartas
  compareCards(card1: Card, card2: Card, manilhas: Card[]): number {
    const strength1 = this.getCardStrength(card1, manilhas)
    const strength2 = this.getCardStrength(card2, manilhas)
    
    if (strength1 > strength2) return 1
    if (strength1 < strength2) return -1
    return 0 // Empate
  }
  
  // Determinar vencedor da rodada
  determineRoundWinner(
    tableCards: { player_id: string; card: Card }[],
    manilhas: Card[],
    players: Player[]
  ): string | null {
    if (tableCards.length < 2) return null
    
    let winnerCard = tableCards[0]
    
    for (let i = 1; i < tableCards.length; i++) {
      const comparison = this.compareCards(
        tableCards[i].card,
        winnerCard.card,
        manilhas
      )
      if (comparison > 0) {
        winnerCard = tableCards[i]
      } else if (comparison === 0) {
        return null // Empate
      }
    }
    
    return winnerCard.player_id
  }
  
  // Validar jogada
  validatePlay(
    playerId: string,
    card: Card,
    gameState: GameState
  ): { valid: boolean; error?: string } {
    const player = gameState.players.find(p => p.id === playerId)
    
    if (!player) {
      return { valid: false, error: 'Jogador não encontrado' }
    }
    
    const hasCard = player.cards.some(
      c => c.suit === card.suit && c.value === card.value
    )
    
    if (!hasCard) {
      return { valid: false, error: 'Você não possui esta carta' }
    }
    
    // Verificar se é a vez do jogador
    const currentPlayerIndex = gameState.current_turn % gameState.players.length
    if (gameState.players[currentPlayerIndex].id !== playerId) {
      return { valid: false, error: 'Não é sua vez' }
    }
    
    return { valid: true }
  }
  
  // Display da carta
  private getCardDisplay(value: Card['value'], suit: Card['suit']): string {
    const valueMap: Record<number, string> = {
      1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7',
      10: 'Q', 11: 'J', 12: 'K'
    }
    const suitSymbol = {
      ouros: '♦', espadas: '♠', copas: '♥', paus: '♣'
    }
    return `${valueMap[value]}${suitSymbol[suit]}`
  }
  
  // Calcular pontos do truco
  calculateTrucoPoints(trucoValue: number): number {
    // Truco = 3, Seis = 6, Nove = 9, Doze = 12
    return trucoValue
  }
}

export const trucoEngine = new TrucoEngine()
