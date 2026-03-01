'use client'

import { useState } from 'react'
import { submitAfiliacion } from './actions'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function AfiliacionPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const result = await submitAfiliacion(formData)

        if (result.error) {
            setError(result.error)
        } else if (result.success) {
            setSuccess(true)
        }

        setLoading(false)
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 bg-slate-50">
                <CheckCircle2 className="w-24 h-24 text-[var(--color-brand-green)] mb-6" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">¡Solicitud Recibida!</h1>
                <p className="text-lg text-gray-600 max-w-xl text-center mb-8">
                    Hemos registrado exitosamente tus datos. Tu inscripción pasará a nuestra directiva para la validación requerida por el CNE. Te contactaremos pronto.
                </p>
                <Link href="/" className="bg-[var(--color-brand-magenta)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-brand-magenta-dark)] transition-colors">
                    Volver al Inicio
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                    <div className="bg-[var(--color-brand-magenta)] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Formulario de Afiliación Oficial</h1>
                        <p className="text-magenta-100 text-lg relative z-10">
                            Unete a la Fuerza de Zamora Chinchipe. Llena el formulario con tus datos reales conforme tu cédula de identidad.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 flex items-start gap-3 rounded-r-lg">
                                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Datos Personales</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="nombres" className="text-sm font-semibold text-gray-700">Nombres Completos <span className="text-red-500">*</span></label>
                                    <input required id="nombres" name="nombres" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="apellidos" className="text-sm font-semibold text-gray-700">Apellidos Completos <span className="text-red-500">*</span></label>
                                    <input required id="apellidos" name="apellidos" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="cedula" className="text-sm font-semibold text-gray-700">Cédula de Identidad <span className="text-red-500">*</span></label>
                                    <input required id="cedula" name="cedula" type="text" minLength={10} maxLength={10} pattern="\d{10}" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" placeholder="1900000000" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="fecha_nacimiento" className="text-sm font-semibold text-gray-700">Fecha de Nacimiento <span className="text-red-500">*</span></label>
                                    <input required id="fecha_nacimiento" name="fecha_nacimiento" type="date" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                                    <input id="email" name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="telefono" className="text-sm font-semibold text-gray-700">Teléfono Celular</label>
                                    <input id="telefono" name="telefono" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Ubicación (Zamora Chinchipe)</h3>

                            <div className="space-y-2">
                                <label htmlFor="residencia" className="text-sm font-semibold text-gray-700">Dirección de Residencia <span className="text-red-500">*</span></label>
                                <input required id="residencia" name="residencia" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="canton" className="text-sm font-semibold text-gray-700">Cantón <span className="text-red-500">*</span></label>
                                    <select required id="canton" name="canton" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all bg-white">
                                        <option value="">Seleccione un cantón...</option>
                                        <option value="Zamora">Zamora</option>
                                        <option value="Chinchipe">Chinchipe</option>
                                        <option value="Nangaritza">Nangaritza</option>
                                        <option value="Yacuambi">Yacuambi</option>
                                        <option value="Yantzaza">Yantzaza</option>
                                        <option value="El Pangui">El Pangui</option>
                                        <option value="Centinela del Cóndor">Centinela del Cóndor</option>
                                        <option value="Palanda">Palanda</option>
                                        <option value="Paquisha">Paquisha</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="parroquia" className="text-sm font-semibold text-gray-700">Parroquia <span className="text-red-500">*</span></label>
                                    <input required id="parroquia" name="parroquia" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-[var(--color-brand-magenta)] outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="text-lg font-bold text-gray-900">Tipo de Adhesión (CNE)</h3>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" name="es_permanente" className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-brand-magenta)] focus:ring-[var(--color-brand-magenta)]" />
                                <div>
                                    <span className="font-semibold text-gray-900 block group-hover:text-[var(--color-brand-magenta)] transition-colors">Deseo ser Adherente Permanente</span>
                                    <p className="text-sm text-gray-500">Me comprometo a participar activamente en el movimiento, con voz y voto en las asambleas según el Régimen Orgánico.</p>
                                </div>
                            </label>
                        </div>

                        <div className="space-y-5">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Declaraciones Legales</h3>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input required type="checkbox" name="no_pertenece_movimiento" className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-brand-magenta)] focus:ring-[var(--color-brand-magenta)]" />
                                <span className="text-sm text-gray-600">Declaro bajo juramento que <strong>NO</strong> pertenezco a ninguna otra organización política debidamente inscrita en el CNE, o en su defecto, adjuntaré mi desafiliación. <span className="text-red-500">*</span></span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input required type="checkbox" name="acepta_principios" className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-brand-magenta)] focus:ring-[var(--color-brand-magenta)]" />
                                <span className="text-sm text-gray-600">Acepto libre y voluntariamente la <Link href="/principios" target="_blank" className="text-[var(--color-brand-magenta)] hover:underline">Declaración de Principios</Link> y el Régimen Orgánico del Movimiento FUERZA. <span className="text-red-500">*</span></span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input required type="checkbox" name="consentimiento_datos" className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-brand-magenta)] focus:ring-[var(--color-brand-magenta)]" />
                                <span className="text-sm text-gray-600">Autorizo el tratamiento de mis datos personales según la LOPDP (Ecuador) para fines estadísticos, comunicacionales y de validación ante el CNE. Conoce nuestra <Link href="/legal/privacidad" target="_blank" className="text-[var(--color-brand-magenta)] hover:underline">Política de Privacidad</Link>. <span className="text-red-500">*</span></span>
                            </label>
                        </div>

                        <div className="pt-6 border-t">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[var(--color-brand-magenta)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--color-brand-magenta-dark)] hover:shadow-lg hover:shadow-magenta-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Procesando Registro Segur...
                                    </>
                                ) : (
                                    'Registrar Afiliación Oficial'
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                                <ShieldAlert className="w-4 h-4" /> Sitio protegido bajo normativas de ciberseguridad del Ecuador
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
