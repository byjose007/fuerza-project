import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Eye, EyeOff, Pencil } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function AdminNoticiasPage() {
    const supabase = await createClient()
    const { data: noticias } = await supabase
        .from('noticias')
        .select('id, titulo, slug, categoria, publicado, created_at')
        .order('created_at', { ascending: false })

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Noticias</h1>
                    <p className="text-sm text-gray-500 mt-1">{noticias?.length ?? 0} artículos totales</p>
                </div>
                <Link
                    href="/admin/noticias/nueva"
                    className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[var(--color-brand-magenta-dark)] transition text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Noticia
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Título</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {!noticias?.length && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    No hay noticias aún. Crea tu primer comunicado.
                                </td>
                            </tr>
                        )}
                        {noticias?.map(n => (
                            <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{n.titulo}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    {n.categoria ? (
                                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-medium">{n.categoria}</span>
                                    ) : '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${n.publicado ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {n.publicado ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                        {n.publicado ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">
                                    {n.created_at ? format(new Date(n.created_at), "d MMM yyyy", { locale: es }) : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/noticias/${n.slug}/editar`} className="inline-flex items-center gap-1 text-gray-400 hover:text-[var(--color-brand-magenta)] transition">
                                        <Pencil className="w-3.5 h-3.5" />
                                        <span className="text-xs">Editar</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
