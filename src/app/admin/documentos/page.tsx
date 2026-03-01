import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Plus, FileText, Download, ExternalLink, Eye, EyeOff } from 'lucide-react'

const TIPO_LABELS: Record<string, { label: string; color: string }> = {
    regimen: { label: 'Régimen Orgánico', color: 'bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta-dark)]' },
    principios: { label: 'Principios', color: 'bg-purple-100 text-purple-700' },
    financiero: { label: 'Informe Financiero', color: 'bg-emerald-100 text-emerald-700' },
    kit_prensa: { label: 'Kit de Prensa', color: 'bg-blue-100 text-blue-700' },
    capacitacion: { label: 'Capacitación', color: 'bg-amber-100 text-amber-700' },
    plan_gobierno: { label: 'Plan de Gobierno', color: 'bg-slate-100 text-slate-700' },
}

export default async function AdminDocumentosPage() {
    const supabase = await createClient()
    const { data: documentos } = await supabase
        .from('documentos')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
                    <p className="text-sm text-gray-500 mt-1">{documentos?.length ?? 0} archivos cargados</p>
                </div>
                <Link
                    href="/admin/documentos/subir"
                    className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[var(--color-brand-magenta-dark)] transition text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Subir Documento
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Documento</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Visibilidad</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {!documentos?.length && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                                    No hay documentos cargados aún. Sube tu primer archivo.
                                </td>
                            </tr>
                        )}
                        {documentos?.map(d => {
                            const tipo = TIPO_LABELS[d.tipo] || { label: d.tipo, color: 'bg-gray-100 text-gray-600' }
                            return (
                                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[var(--color-brand-magenta)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 text-[var(--color-brand-magenta)]" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{d.titulo}</p>
                                                {d.descripcion && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{d.descripcion}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${tipo.color}`}>
                                            {tipo.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${d.publico ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            {d.publico ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {d.publico ? 'Público' : 'Privado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {d.created_at ? format(new Date(d.created_at), "d MMM yyyy", { locale: es }) : '—'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {d.file_url && (
                                            <a
                                                href={d.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[var(--color-brand-magenta)] hover:underline text-xs font-medium"
                                            >
                                                <Download className="w-3.5 h-3.5" /> Descargar
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
