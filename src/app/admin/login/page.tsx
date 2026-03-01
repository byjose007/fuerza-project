'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError('Credenciales incorrectas. Verifica tu correo y contraseña.')
            setLoading(false)
            return
        }

        router.push('/admin/dashboard')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[var(--color-brand-magenta-dark)]/20 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[var(--color-brand-magenta)] to-[var(--color-brand-magenta-dark)] p-8 text-white text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white/20 rounded-2xl p-3">
                                <Image
                                    src="/logo-fuerza.jpeg"
                                    alt="FUERZA"
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto object-contain mix-blend-multiply"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                            <Shield className="w-4 h-4" />
                            <span>Acceso Restringido – Solo Personal Autorizado</span>
                        </div>
                        <h1 className="text-2xl font-bold mt-2">Panel Administrativo</h1>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="admin@fuerza.ec"
                                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[var(--color-brand-magenta)] text-white py-3.5 rounded-xl font-bold hover:bg-[var(--color-brand-magenta-dark)] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    'Ingresar al Panel'
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center mt-6">
                            Acceso restringido. Solo personal autorizado del Movimiento FUERZA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
