'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { X, Save, Image as ImageIcon } from 'lucide-react'

const CATEGORIAS = ['Comunicado Oficial', 'Posición Política', 'Evento', 'Logro Territorial', 'Transparencia']

export default function NuevaNoticiaPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        titulo: '',
        slug: '',
        resumen: '',
        contenido: '',
        categoria: '',
        publicado: false,
    })

    const handleTitleChange = (titulo: string) => {
        const slug = titulo.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        setForm(f => ({ ...f, titulo, slug }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        const { error: dbError } = await supabase.from('noticias').insert([{
            ...form,
            autor_id: user?.id,
            fecha_publicacion: form.publicado ? new Date().toISOString() : null,
        }])

        if (dbError) {
            setError(dbError.message)
            setLoading(false)
            return
        }
        router.push('/admin/noticias')
    }

    return (
        <div className="p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nueva Noticia</h1>
                    <p className="text-sm text-gray-500 mt-1">Crea un comunicado o artículo</p>
                </div>
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <X className="w-4 h-4" /> Cancelar
                </button>
            </div>

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título *</label>
                        <input
                            value={form.titulo}
                            onChange={e => handleTitleChange(e.target.value)}
                            required
                            placeholder="Título del comunicado..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slug (URL)</label>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                            <span className="text-xs text-gray-400">/noticias/</span>
                            <input
                                value={form.slug}
                                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                                className="flex-1 bg-transparent text-sm focus:outline-none"
                                placeholder="url-de-la-noticia"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                        <select
                            value={form.categoria}
                            onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                        >
                            <option value="">Seleccionar categoría</option>
                            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resumen (descripción breve)</label>
                        <textarea
                            value={form.resumen}
                            onChange={e => setForm(f => ({ ...f, resumen: e.target.value }))}
                            rows={2}
                            placeholder="Breve descripción que aparece en el listado..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contenido completo *</label>
                        <textarea
                            value={form.contenido}
                            onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
                            required
                            rows={12}
                            placeholder="Escribe aquí el contenido completo del comunicado o artículo..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition resize-y"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.publicado}
                            onChange={e => setForm(f => ({ ...f, publicado: e.target.checked }))}
                            className="w-5 h-5 accent-[var(--color-brand-magenta)]"
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Publicar inmediatamente</p>
                            <p className="text-xs text-gray-400">Si no lo marcas, queda como borrador.</p>
                        </div>
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-brand-magenta-dark)] disabled:opacity-60 transition"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Guardando...' : 'Guardar Noticia'}
                    </button>
                </div>
            </form>
        </div>
    )
}
