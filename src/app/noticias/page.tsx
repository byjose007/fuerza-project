import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Metadata } from 'next'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Noticias | Movimiento FUERZA',
    description: 'Comunicados oficiales, posiciones políticas y novedades del Movimiento Provincial FUERZA – Zamora Chinchipe.',
}

const CATEGORIA_COLORS: Record<string, string> = {
    'Comunicado Oficial': 'bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta-dark)]',
    'Posición Política': 'bg-slate-100 text-slate-700',
    'Evento': 'bg-amber-100 text-amber-700',
    'Logro Territorial': 'bg-emerald-100 text-emerald-700',
    'Transparencia': 'bg-purple-100 text-purple-700',
}

export default async function NoticiasPage() {
    const supabase = await createClient()
    const { data: noticias } = await supabase
        .from('noticias')
        .select('id, titulo, slug, resumen, categoria, fecha_publicacion, created_at')
        .eq('publicado', true)
        .order('created_at', { ascending: false })

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-magenta)]/20 text-[var(--color-brand-magenta)] text-sm font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-brand-magenta)] animate-pulse" />
                        Prensa Oficial
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Noticias y Comunicados</h1>
                    <p className="text-gray-400 text-lg">
                        Información oficial del Movimiento Provincial FUERZA. Transparencia informativa para Zamora Chinchipe.
                    </p>
                </div>
            </section>

            {/* Articles */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    {!noticias?.length ? (
                        <div className="bg-white rounded-2xl p-16 text-center border border-slate-100">
                            <p className="text-gray-400 text-lg">Próximamente publicaremos nuestros primeros comunicados.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {noticias.map((n) => (
                                <Link
                                    key={n.id}
                                    href={`/noticias/${n.slug}`}
                                    className="group block bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:border-[var(--color-brand-magenta)]/20 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            {n.categoria && (
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${CATEGORIA_COLORS[n.categoria] ?? 'bg-gray-100 text-gray-600'}`}>
                                                    <Tag className="w-3 h-3" />
                                                    {n.categoria}
                                                </span>
                                            )}
                                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-brand-magenta)] transition-colors mb-2">
                                                {n.titulo}
                                            </h2>
                                            {n.resumen && (
                                                <p className="text-gray-500 text-sm line-clamp-2">{n.resumen}</p>
                                            )}
                                            <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{n.fecha_publicacion || n.created_at ? format(new Date(n.fecha_publicacion || n.created_at), "d 'de' MMMM, yyyy", { locale: es }) : '—'}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-brand-magenta)] transition-all flex-shrink-0 mt-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
