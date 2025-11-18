'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getCurrentUser } from '@/lib/supabase'
import { Room } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Trophy, Plus, LogOut, User as UserIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    loadRooms()
  }, [])

  async function checkUser() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    setLoading(false)
  }

  async function loadRooms() {
    // Simulação - em produção viria do Supabase
    const mockRooms: Room[] = [
      {
        id: '1',
        name: 'Sala do João',
        host_id: 'user1',
        visibility: 'public',
        mode: '2v2',
        variant: 'paulista',
        max_players: 4,
        current_players: 2,
        status: 'waiting',
        bet_amount: 10,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Truco Mineiro',
        host_id: 'user2',
        visibility: 'public',
        mode: '2v2',
        variant: 'mineiro',
        max_players: 4,
        current_players: 3,
        status: 'waiting',
        created_at: new Date().toISOString()
      }
    ]
    setRooms(mockRooms)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🃏 Truco Online
            </h1>
            <p className="text-slate-300">
              Bem-vindo, <span className="text-emerald-400 font-semibold">{user?.email}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              onClick={() => router.push('/profile')}
            >
              <UserIcon className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-emerald-400" />
                Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">1.245</div>
              <p className="text-slate-300 text-sm">ELO Rating</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Partidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">127</div>
              <p className="text-slate-300 text-sm">Total jogadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" />
                Vitórias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">68%</div>
              <p className="text-slate-300 text-sm">Taxa de vitória</p>
            </CardContent>
          </Card>
        </div>

        {/* Rooms Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Salas Disponíveis</h2>
              <p className="text-slate-400">Escolha uma sala ou crie a sua</p>
            </div>
            <Button
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg"
              onClick={() => router.push('/create-room')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Sala
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <Card
                key={room.id}
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-all cursor-pointer"
                onClick={() => router.push(`/game/${room.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{room.name}</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {room.variant.charAt(0).toUpperCase() + room.variant.slice(1)} • {room.mode}
                      </CardDescription>
                    </div>
                    {room.visibility === 'private' && (
                      <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-700">
                        Privada
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {room.current_players}/{room.max_players} jogadores
                      </span>
                    </div>
                    {room.bet_amount && (
                      <Badge className="bg-emerald-900/50 text-emerald-300 border-emerald-700">
                        R$ {room.bet_amount}
                      </Badge>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/game/${room.id}`)
                    }}
                  >
                    Entrar na Sala
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {rooms.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-4">Nenhuma sala disponível no momento</p>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                onClick={() => router.push('/create-room')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Sala
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
