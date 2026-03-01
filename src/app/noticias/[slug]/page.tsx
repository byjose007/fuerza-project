import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()
    const { data: noticia } = await supabase
        .from('noticias')
        .select('titulo, resumen')
        .eq('slug', slug)
        .eq('publicado', true)
        .single()

    if (!noticia) return { title: 'Noticia | FUERZA' }
    return {
        title: `${noticia.titulo} | FUERZA`,
        description: noticia.resumen || noticia.titulo,
        openGraph: {
            title: noticia.titulo,
            description: noticia.resumen || '',
            type: 'article',
        },
    }
}

export default async function NoticiaPage({ params }: Props) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: noticia } = await supabase
        .from('noticias')
        .select('*')
        .eq('slug', slug)
        .eq('publicado', true)
        .single()

    if (!noticia) notFound()

    return (
        <article className="flex flex-col w-full">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href="/noticias" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition">
                        <ArrowLeft className="w-4 h-4" /> Volver a Noticias
                    </Link>
                    {noticia.categoria && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand-magenta)]/20 text-[var(--color-brand-magenta)] mb-4">
                            <Tag className="w-3 h-3" /> {noticia.categoria}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{noticia.titulo}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {format(new Date(noticia.fecha_publicacion || noticia.created_at), "d 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                        {noticia.resumen && (
                            <p className="text-lg text-gray-600 font-medium border-l-4 border-[var(--color-brand-magenta)] pl-4 mb-8">
                                {noticia.resumen}
                            </p>
                        )}
                        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {noticia.contenido}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/noticias"
                            className="inline-flex items-center gap-2 text-[var(--color-brand-magenta)] font-semibold hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" /> Ver todos los comunicados
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    )
}
