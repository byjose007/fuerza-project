'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AfiliacionModal } from '@/components/AfiliacionModal'

export function Header() {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            setIsAdmin(!!user)
        })
    }, [])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        setIsAdmin(false)
        router.refresh()
    }

    return (
        <>
            <AfiliacionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo-fuerza.jpeg"
                            alt="Logo Movimiento Provincial FUERZA"
                            width={180}
                            height={60}
                            className="object-contain h-12 w-auto mix-blend-multiply"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-600">
                        <Link href="/sobre-nosotros" className="hover:text-[var(--color-brand-magenta)] transition-colors">
                            Sobre FUERZA
                        </Link>
                        <Link href="/principios" className="hover:text-[var(--color-brand-magenta)] transition-colors">
                            Principios
                        </Link>
                        <Link href="/noticias" className="hover:text-[var(--color-brand-magenta)] transition-colors">
                            Noticias
                        </Link>
                        <Link href="/galeria" className="hover:text-[var(--color-brand-magenta)] transition-colors">
                            Galería
                        </Link>
                        <Link href="/transparencia" className="hover:text-[var(--color-brand-magenta)] transition-colors">
                            Transparencia
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        {isAdmin && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/admin/dashboard"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--color-brand-magenta)] bg-gray-100 hover:bg-[var(--color-brand-magenta)]/10 px-4 py-2 rounded-full transition-all"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Panel Admin
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 px-2 py-2 rounded-full transition-all"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-[var(--color-brand-magenta)] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[var(--color-brand-magenta-dark)] transition-all shadow-md hover:scale-105"
                        >
                            Afíliate Ahora
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menú"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
                        <Link href="/sobre-nosotros" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[var(--color-brand-magenta)]">Sobre FUERZA</Link>
                        <Link href="/principios" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[var(--color-brand-magenta)]">Principios</Link>
                        <Link href="/noticias" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[var(--color-brand-magenta)]">Noticias</Link>
                        <Link href="/galeria" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[var(--color-brand-magenta)]">Galería</Link>
                        <Link href="/transparencia" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[var(--color-brand-magenta)]">Transparencia</Link>
                        {isAdmin && (
                            <>
                                <Link
                                    href="/admin/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2 py-2 text-[var(--color-brand-magenta)] font-medium"
                                >
                                    <LayoutDashboard className="w-4 h-4" /> Panel Admin
                                </Link>
                                <button
                                    onClick={() => { setMenuOpen(false); handleLogout() }}
                                    className="flex items-center gap-2 py-2 text-red-500 text-sm"
                                >
                                    <LogOut className="w-4 h-4" /> Cerrar sesión
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => { setMenuOpen(false); setModalOpen(true) }}
                            className="block w-full text-center bg-[var(--color-brand-magenta)] text-white px-6 py-3 rounded-full font-medium mt-2"
                        >
                            Afíliate Ahora
                        </button>
                    </div>
                )}
            </header>
        </>
    )
}
