// Tipos do sistema de Truco

export type GameMode = '2v2' | '1v1'
export type GameVariant = 'paulista' | 'mineiro' | 'argentino'
export type RoomVisibility = 'public' | 'private'

export interface User {
  id: string
  username: string
  email: string
  rating: number
  wins: number
  losses: number
  created_at: string
}

export interface Room {
  id: string
  name: string
  host_id: string
  visibility: RoomVisibility
  mode: GameMode
  variant: GameVariant
  max_players: number
  current_players: number
  status: 'waiting' | 'playing' | 'finished'
  bet_amount?: number
  created_at: string
}

export interface Player {
  id: string
  user_id: string
  username: string
  position: number
  team: 1 | 2
  cards: Card[]
  score: number
}

export interface Card {
  suit: 'ouros' | 'espadas' | 'copas' | 'paus'
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10 | 11 | 12
  display: string
}

export interface GameState {
  room_id: string
  players: Player[]
  current_round: number
  current_turn: number
  table_cards: { player_id: string; card: Card }[]
  truco_value: number
  truco_caller?: string
  truco_pending?: boolean
  team1_score: number
  team2_score: number
  vira?: Card
  manilhas: Card[]
  winner?: number
}

export interface ChatMessage {
  id: string
  room_id: string
  user_id: string
  username: string
  message: string
  timestamp: string
}

export interface Match {
  id: string
  room_id: string
  mode: GameMode
  variant: GameVariant
  started_at: string
  finished_at?: string
  winner_team?: number
  result_json: any
}

export interface Hand {
  match_id: string
  hand_number: number
  log_json: any
  created_at: string
}
