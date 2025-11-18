'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from 'lucide-react'

export default function CreateRoomPage() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')
  const [variant, setVariant] = useState('paulista')
  const [mode, setMode] = useState('2v2')
  const [isPrivate, setIsPrivate] = useState(false)
  const [betAmount, setBetAmount] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreateRoom(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Aqui você criaria a sala no Supabase
    // Por enquanto, apenas redireciona
    setTimeout(() => {
      router.push('/game/new-room-id')
    }, 1000)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="text-white hover:text-emerald-400 mb-6"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Lobby
        </Button>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Criar Nova Sala</CardTitle>
            <CardDescription className="text-slate-400">
              Configure sua partida de truco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roomName" className="text-white">Nome da Sala</Label>
                <Input
                  id="roomName"
                  type="text"
                  placeholder="Minha Sala de Truco"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="variant" className="text-white">Variante do Truco</Label>
                <Select value={variant} onValueChange={setVariant}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="paulista">Truco Paulista</SelectItem>
                    <SelectItem value="mineiro">Truco Mineiro</SelectItem>
                    <SelectItem value="argentino">Truco Argentino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode" className="text-white">Modo de Jogo</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="2v2">2 vs 2 (4 jogadores)</SelectItem>
                    <SelectItem value="1v1">1 vs 1 (2 jogadores)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label htmlFor="private" className="text-white">Sala Privada</Label>
                  <p className="text-sm text-slate-400">Apenas com convite</p>
                </div>
                <Switch
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="betAmount" className="text-white">Valor da Aposta (opcional)</Label>
                <Input
                  id="betAmount"
                  type="number"
                  placeholder="0"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400">
                  Deixe em branco para jogar sem apostas
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                disabled={loading}
              >
                {loading ? 'Criando sala...' : 'Criar Sala'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
