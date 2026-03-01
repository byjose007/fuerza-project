import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Search, Download } from 'lucide-react'

export default async function AdminAdherentesPage({
    searchParams,
}: {
    searchParams: Promise<{ canton?: string; q?: string; pagina?: string }>
}) {
    const params = await searchParams
    const canton = params.canton || ''
    const q = params.q || ''
    const pagina = parseInt(params.pagina || '1')
    const perPage = 20

    const supabase = await createClient()

    let query = supabase
        .from('afiliados')
        .select('id, nombres, apellidos, cedula, canton, parroquia, fecha_nacimiento, created_at, consentimiento_datos', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((pagina - 1) * perPage, pagina * perPage - 1)

    if (canton) query = query.eq('canton', canton)
    if (q) query = query.or(`nombres.ilike.%${q}%,apellidos.ilike.%${q}%,cedula.ilike.%${q}%`)

    const { data: adherentes, count, error } = await query

    const totalPages = Math.ceil((count ?? 0) / perPage)

    const CANTONES = ['Zamora', 'Chinchipe', 'Yantzaza', 'El Pangui', 'Centinela del Cóndor', 'Paquisha', 'Nangaritza', 'Palanda', 'Yacuambi']

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Afiliados</h1>
                    <p className="text-gray-500 text-sm mt-1">{count ?? 0} registros totales</p>
                </div>
                <a
                    href="/api/admin/export-csv"
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </a>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex gap-3 flex-wrap">
                <form className="flex gap-3 w-full flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-48 border border-gray-200 rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            name="q"
                            defaultValue={q}
                            placeholder="Buscar por nombre o cédula..."
                            className="flex-1 text-sm focus:outline-none"
                        />
                    </div>
                    <select
                        name="canton"
                        defaultValue={canton}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                    >
                        <option value="">Todos los cantones</option>
                        {CANTONES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button
                        type="submit"
                        className="bg-[var(--color-brand-magenta)] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[var(--color-brand-magenta-dark)] transition"
                    >
                        Filtrar
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cédula</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cantón</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Parroquia</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Registro</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {error && (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-red-500">{error.message}</td></tr>
                            )}
                            {!error && adherentes?.length === 0 && (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No se encontraron registros con esos filtros.</td></tr>
                            )}
                            {adherentes?.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {a.nombres} {a.apellidos}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-mono">{a.cedula}</td>
                                    <td className="px-6 py-4 text-gray-600">{a.canton || '—'}</td>
                                    <td className="px-6 py-4 text-gray-600">{a.parroquia || '—'}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {a.created_at ? format(new Date(a.created_at), "d MMM yyyy", { locale: es }) : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.consentimiento_datos
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {a.consentimiento_datos ? 'Consentido' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Página {pagina} de {totalPages}</p>
                        <div className="flex gap-2">
                            {pagina > 1 && (
                                <a
                                    href={`?canton=${canton}&q=${q}&pagina=${pagina - 1}`}
                                    className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                                >
                                    Anterior
                                </a>
                            )}
                            {pagina < totalPages && (
                                <a
                                    href={`?canton=${canton}&q=${q}&pagina=${pagina + 1}`}
                                    className="px-3 py-1 bg-[var(--color-brand-magenta)] text-white rounded-lg text-sm"
                                >
                                    Siguiente
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
