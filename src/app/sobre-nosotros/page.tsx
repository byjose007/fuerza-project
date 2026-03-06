import { Download, Users, Scale, Flag, MapPin } from "lucide-react";
import Link from "next/link";
import ZamoraMapClient from "@/components/territorio/ZamoraMapClient";
import { createClient } from '@/lib/supabase/server';

export const metadata = {
    title: "Sobre FUERZA - Movimiento Provincial Zamora Chinchipe",
    description: "Conoce la historia, estructura y el Régimen Orgánico del Movimiento Frente de Unidad por la Equidad y Renovación.",
};

export const revalidate = 60;

export default async function SobreNosotrosPage() {
    const supabase = await createClient();

    // Fetch team members
    const { data: directiva } = await supabase
        .from('directiva')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true })
        .order('created_at', { ascending: false });

    return (
        <div className="flex flex-col">
            {/* Header Banner */}
            <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-magenta)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre FUERZA</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Un movimiento ciudadano nacido en Zamora Chinchipe con la convicción de renovar la política con ética, transparencia y participación real.
                    </p>
                </div>
            </section>

            {/* Main Content grid */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12">

                    {/* Left Column: History & Documents */}
                    <div className="md:col-span-8 space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Flag className="w-8 h-8 text-[var(--color-brand-magenta)]" />
                                Nuestra Historia
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    El <strong>Frente de Unidad por la Equidad y Renovación (FUERZA)</strong> nace de la necesidad apremiante de devolverle a Zamora Chinchipe una representación política digna, alejada de las prácticas de la vieja política y conectada genuinamente con las bases ciudadanas.
                                </p>
                                <p>
                                    Somos una amalgama de juventudes emprendedoras, líderes campesinos, profesionales, nacionalidades indígenas y ciudadanos que compartimos una misma visión: construir una provincia próspera, equitativa y respetuosa de la Amazonía.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Scale className="w-8 h-8 text-[var(--color-brand-green)]" />
                                Régimen Orgánico
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Nuestro accionar está estrictamente regido por nuestro marco legal interno, aprobado por el Consejo Nacional Electoral (CNE), asegurando democracia interna y transparencia irrestricta.
                            </p>
                            <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="font-bold text-lg">Régimen Orgánico de FUERZA</h3>
                                    <p className="text-sm text-gray-500">Documento Oficial. PDF, 416 KB (v. Final)</p>
                                </div>
                                {/* 
                  NOTE FOR USER: In a real deploy, these files would be uploaded to Supabase Storage.
                  For this MVP, we provide a placeholder download button.
                */}
                                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                                    <Download className="w-5 h-5" />
                                    Descargar PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Structure Sidebar */}
                    <div className="md:col-span-4">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                                <Users className="w-6 h-6 text-[var(--color-brand-magenta)]" />
                                Estructura Orgánica
                            </h3>

                            <ul className="space-y-6">
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[var(--color-brand-magenta)] before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Asamblea Provincial</h4>
                                    <p className="text-sm text-gray-500">Máximo organismo de decisión democrática de los adherentes.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Directiva Provincial</h4>
                                    <p className="text-sm text-gray-500 italic pb-2">Información de autoridades en proceso de actualización ante el CNE.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Directivas Cantonales</h4>
                                    <p className="text-sm text-gray-500">Representación en los cantones de Zamora Chinchipe.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[var(--color-brand-green)] before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Órgano Electoral Interno</h4>
                                    <p className="text-sm text-gray-500">Garante de la democracia partidista interna.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Defensoría</h4>
                                    <p className="text-sm text-gray-500">Protección de los derechos de los adherentes.</p>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                <Link href="/afiliacion" className="text-[var(--color-brand-magenta)] font-semibold hover:underline flex items-center justify-center gap-1">
                                    Quieres ser parte? <Users className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* DIRECTIVA PROVINCIAL */}
            {directiva && directiva.length > 0 && (
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Directiva Provincial</h2>
                            <p className="text-lg text-gray-600">
                                Un equipo de ciudadanos comprometidos con liderar el cambio de la provincia desde el territorio y con transparencia.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
                            {directiva.map((miembro) => (
                                <div key={miembro.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        {miembro.url_foto ? (
                                            <img
                                                src={miembro.url_foto}
                                                alt={miembro.nombre}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="w-20 h-20 text-gray-300" />
                                            </div>
                                        )}
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="font-bold text-xl mb-1">{miembro.nombre}</h3>
                                            <p className="text-[var(--color-brand-magenta)] font-bold text-sm tracking-widest uppercase mb-0">{miembro.cargo}</p>
                                        </div>
                                    </div>

                                    {miembro.descripcion && (
                                        <div className="p-6 flex-grow flex items-center justify-center text-center">
                                            <p className="text-gray-600 text-sm italic leading-relaxed">
                                                "{miembro.descripcion}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mapa Interactivo Completo — Presencia Territorial */}
            <section id="presencia-territorial" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {/* Encabezado */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta)] text-sm font-bold tracking-wide uppercase mb-6">
                            <MapPin className="w-4 h-4" /> Zamora Chinchipe
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Presencia Territorial en <span className="text-[var(--color-brand-magenta)]">Tiempo Real</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Explora la distribución de nuestros afiliados en los 9 cantones de la provincia. Pasa el cursor sobre cada cantón para ver el detalle.
                        </p>
                    </div>

                    {/* Contenedor Mapa + Panel */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto">
                        {/* Panel Lateral */}
                        <div className="w-full md:w-72 bg-gray-50/70 border-b md:border-b-0 md:border-r border-gray-100 p-8 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[var(--color-brand-magenta)]" />
                                Nuestros Cantones
                            </h3>
                            <div className="space-y-4 mb-8">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    El mapa refleja el volumen de afiliación ciudadana en cada cantón de Zamora Chinchipe.
                                </p>
                                <div className="p-4 bg-[var(--color-brand-magenta)]/5 rounded-2xl border border-[var(--color-brand-magenta)]/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-3 h-3 rounded-full bg-[var(--color-brand-magenta)]"></span>
                                        <span className="text-xs font-bold text-gray-700 uppercase">Alta Densidad</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-[#fdf2f8] border border-[var(--color-brand-magenta)]/20"></span>
                                        <span className="text-xs font-bold text-gray-700 uppercase">Baja Densidad</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Users className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900">¿Aún no estás afiliado?</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">Suma tu apoyo en línea en menos de 2 minutos.</p>
                                    <Link href="/afiliacion" className="block w-full text-center bg-[var(--color-brand-magenta)] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#9d1d52] transition-colors">
                                        Afiliarme Ahora
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Mapa Interactivo */}
                        <div className="flex-1 bg-white p-4 min-h-[520px] flex items-center justify-center">
                            <ZamoraMapClient />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

