'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { X, Upload, FileText, Check } from 'lucide-react'

const TIPOS = [
    { value: 'regimen', label: 'Régimen Orgánico' },
    { value: 'principios', label: 'Declaración de Principios' },
    { value: 'financiero', label: 'Informe Financiero' },
    { value: 'kit_prensa', label: 'Kit de Prensa' },
    { value: 'capacitacion', label: 'Material de Capacitación' },
    { value: 'plan_gobierno', label: 'Plan de Gobierno' },
]

export default function SubirDocumentoPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [form, setForm] = useState({
        titulo: '',
        descripcion: '',
        tipo: '',
        publico: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) { setError('Selecciona un archivo.'); return }
        setLoading(true)
        setError('')

        const supabase = createClient()

        // 1. Upload file to Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
        const filePath = `documentos/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('documentos_oficiales')
            .upload(filePath, file)

        if (uploadError) {
            setError('Error al subir archivo: ' + uploadError.message)
            setLoading(false)
            return
        }

        // 2. Get public URL
        const { data: urlData } = supabase.storage
            .from('documentos_oficiales')
            .getPublicUrl(filePath)

        // 3. Insert record in DB
        const { error: dbError } = await supabase.from('documentos').insert([{
            titulo: form.titulo,
            descripcion: form.descripcion,
            tipo: form.tipo,
            publico: form.publico,
            file_url: urlData.publicUrl,
        }])

        if (dbError) {
            setError('Error al guardar: ' + dbError.message)
            setLoading(false)
            return
        }

        router.push('/admin/documentos')
    }

    return (
        <div className="p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Subir Documento</h1>
                    <p className="text-sm text-gray-500 mt-1">Carga informes, planes o documentos oficiales</p>
                </div>
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <X className="w-4 h-4" /> Cancelar
                </button>
            </div>

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título del documento *</label>
                        <input
                            value={form.titulo}
                            onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                            required
                            placeholder="Ej: Informe Financiero Q1 2026"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
                        <textarea
                            value={form.descripcion}
                            onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                            rows={2}
                            placeholder="Breve descripción del documento..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de documento *</label>
                        <select
                            value={form.tipo}
                            onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition"
                        >
                            <option value="">Seleccionar tipo</option>
                            {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Archivo (PDF, DOC, XLS) *</label>
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 cursor-pointer hover:border-[var(--color-brand-magenta)]/40 hover:bg-[var(--color-brand-magenta)]/5 transition-all">
                            {file ? (
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Check className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{file.name}</p>
                                        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 text-gray-300 mb-3" />
                                    <p className="text-sm text-gray-500"><span className="text-[var(--color-brand-magenta)] font-medium">Click para seleccionar</span> o arrastra un archivo</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, XLS, XLSX — máx 10MB</p>
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                onChange={e => setFile(e.target.files?.[0] ?? null)}
                            />
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.publico}
                            onChange={e => setForm(f => ({ ...f, publico: e.target.checked }))}
                            className="w-5 h-5 accent-[var(--color-brand-magenta)]"
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Documento público</p>
                            <p className="text-xs text-gray-400">Visible en la sección de Transparencia.</p>
                        </div>
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-brand-magenta-dark)] disabled:opacity-60 transition"
                    >
                        <Upload className="w-4 h-4" />
                        {loading ? 'Subiendo...' : 'Subir Documento'}
                    </button>
                </div>
            </form>
        </div>
    )
}
