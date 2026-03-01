'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { submitAfiliacion } from '@/app/afiliacion/actions'

interface AfiliacionModalProps {
    isOpen: boolean
    onClose: () => void
}

const CANTONES = ['Zamora', 'Chinchipe', 'Yantzaza', 'El Pangui', 'Centinela del Cóndor', 'Paquisha', 'Nangaritza', 'Palanda', 'Yacuambi']

export function AfiliacionModal({ isOpen, onClose }: AfiliacionModalProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const overlayRef = useRef<HTMLDivElement>(null)

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            setStatus('idle')
            setErrorMsg('')
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')
        const formData = new FormData(e.currentTarget)
        const result = await submitAfiliacion(formData)
        if (result?.error) {
            setStatus('error')
            setErrorMsg(result.error)
        } else {
            setStatus('success')
        }
    }

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
                {/* Header gradient */}
                <div className="bg-gradient-to-br from-[var(--color-brand-magenta)] to-[var(--color-brand-magenta-dark)] text-white px-8 py-6 rounded-t-3xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="Cerrar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-6 h-6 opacity-80" />
                        <span className="text-sm font-medium opacity-80">Registro oficial • CNE</span>
                    </div>
                    <h2 className="text-2xl font-bold">Formulario de Afiliación</h2>
                    <p className="text-sm opacity-80 mt-1">Únete a FUERZA – llena con tus datos de cédula</p>
                </div>

                <div className="px-8 py-6">
                    {/* SUCCESS STATE */}
                    {status === 'success' && (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">¡Bienvenido/a a FUERZA!</h3>
                            <p className="text-gray-600 max-w-sm">
                                Tu solicitud de afiliación fue recibida. Nuestro equipo provincial la revisará y te contactará.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 bg-[var(--color-brand-magenta)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--color-brand-magenta-dark)] transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}

                    {/* ERROR BANNER */}
                    {status === 'error' && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{errorMsg}</p>
                        </div>
                    )}

                    {/* FORM */}
                    {status !== 'success' && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombres *</label>
                                    <input name="nombres" required placeholder="Ej: María Elena" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Apellidos *</label>
                                    <input name="apellidos" required placeholder="Ej: Torres Jiménez" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Cédula de Identidad *</label>
                                    <input name="cedula" required maxLength={10} minLength={10} pattern="\d{10}" placeholder="10 dígitos" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Fecha de Nacimiento *</label>
                                    <input type="date" name="fecha_nacimiento" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo Electrónico</label>
                                    <input type="email" name="email" placeholder="correo@ejemplo.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Teléfono Celular</label>
                                    <input type="tel" name="telefono" placeholder="09XXXXXXXX" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Cantón *</label>
                                    <select name="canton" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition bg-white">
                                        <option value="">Seleccionar</option>
                                        {CANTONES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Parroquia</label>
                                    <input name="parroquia" placeholder="Parroquia" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Dirección *</label>
                                    <input name="residencia" required placeholder="Barrio / Sector" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-magenta)]/30 focus:border-[var(--color-brand-magenta)] transition" />
                                </div>
                            </div>

                            {/* Legal checkboxes */}
                            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Declaraciones Legales (CNE / LOPDP)</p>
                                {[
                                    { name: 'no_pertenece_movimiento', label: 'Declaro que no pertenezco a ningún otro partido o movimiento político.' },
                                    { name: 'acepta_principios', label: 'Acepto los principios y el Régimen Orgánico del Movimiento FUERZA.' },
                                    { name: 'consentimiento_datos', label: 'Autorizo el tratamiento de mis datos personales conforme a la LOPDP.' },
                                    { name: 'es_permanente', label: 'Solicito adhesión permanente al Movimiento Provincial FUERZA.' },
                                ].map(({ name, label }) => (
                                    <label key={name} className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" name={name} className="mt-1 w-4 h-4 accent-[var(--color-brand-magenta)] flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{label}</span>
                                    </label>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-[var(--color-brand-magenta)] text-white py-4 rounded-full font-bold text-base hover:bg-[var(--color-brand-magenta-dark)] disabled:opacity-60 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                            >
                                {status === 'loading' ? (
                                    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    <>Enviar Solicitud de Afiliación <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
