'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import {
    LayoutDashboard, Users, Newspaper, FileText,
    LogOut, Menu, X, ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/adherentes', label: 'Afiliados', icon: Users },
    { href: '/admin/noticias', label: 'Noticias', icon: Newspaper },
    { href: '/admin/documentos', label: 'Documentos', icon: FileText },
]

export function AdminSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <aside className={`${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-gray-950 text-white flex flex-col transition-all duration-300 min-h-screen`}>
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-white/10">
                {!collapsed && (
                    <div className="bg-white/10 rounded-xl p-1.5">
                        <Image src="/logo-fuerza.jpeg" alt="FUERZA" width={100} height={34} className="h-7 w-auto mix-blend-screen object-contain" />
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`${collapsed ? 'mx-auto' : 'ml-auto'} text-gray-400 hover:text-white p-1`}
                >
                    {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-6 px-2 space-y-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                                ? 'bg-[var(--color-brand-magenta)] text-white'
                                : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>{label}</span>}
                            {!collapsed && active && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="px-2 pb-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>
        </aside>
    )
}
